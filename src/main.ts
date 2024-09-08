import { ConsoleLogger } from './services/console-logger.service';
import { MockDatabase } from './services/mock-database.service';
import { Container } from './di/container';
import { ServiceLifetime } from './types/service-lifetime.enum';
import { App } from './app';
import 'reflect-metadata';

// Initialize DI container
const container = new Container();
container.register<ConsoleLogger>('Logger', ConsoleLogger, ServiceLifetime.Singleton);
container.register<MockDatabase>('Database', MockDatabase, ServiceLifetime.Transient);

// Resolve dependencies and run the app
const app = new App(
    container.resolve<ConsoleLogger>('Logger'),
    container.resolve<MockDatabase>('Database')
);

app.run();
