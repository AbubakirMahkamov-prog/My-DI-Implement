import { ServiceLifetime } from '../types/service-lifetime.enum';
export class Container {
    private services: Map<string, { service: any, lifetime: ServiceLifetime, instance?: any }> = new Map();

    // Modify this to accept constructors
    register<T>(name: string, service: { new (...args: any[]): T }, lifetime: ServiceLifetime = ServiceLifetime.Singleton): void {
        this.services.set(name, { service, lifetime });
    }

    resolve<T>(name: string): T {
        const serviceConfig = this.services.get(name);

        if (!serviceConfig) {
            throw new Error(`Service ${name} not found`);
        }

        // If singleton, return the existing instance or create a new one
        if (serviceConfig.lifetime === ServiceLifetime.Singleton && serviceConfig.instance) {
            return serviceConfig.instance;
        }

        // Resolve dependencies and create a new instance
        const resolvedParams = this.resolveDependencies(serviceConfig.service);
        const instance = new serviceConfig.service(...resolvedParams);

        // Store singleton instance
        if (serviceConfig.lifetime === ServiceLifetime.Singleton) {
            serviceConfig.instance = instance;
        }

        return instance;
    }

    private resolveDependencies<T>(service: any): any[] {
        const paramTypes = Reflect.getMetadata('design:paramtypes', service) || [];
        return paramTypes.map((paramType: any) => this.resolve(paramType.name));
    }
}
