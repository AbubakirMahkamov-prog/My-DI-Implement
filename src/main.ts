import { ConsoleLogger } from './services/console-logger.service';
import { MockDatabase } from './services/mock-database.service';
import { Container } from './di/container';
import { App } from './app';

// Initialize DI container
const container = new Container();
container.register<ConsoleLogger>('Logger', new ConsoleLogger());
container.register<MockDatabase>('Database', new MockDatabase());

// Resolve dependencies and run the app
const app = new App(
    container.resolve<ConsoleLogger>('Logger'),
    container.resolve<MockDatabase>('Database'),
);

app.run();
