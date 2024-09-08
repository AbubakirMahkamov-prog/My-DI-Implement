import { Logger } from './interfaces/logger.interface';
import { Database } from './interfaces/database.interface';

export class App {
    constructor(private logger: Logger, private database: Database) {}
    run() {
        this.logger.log('Application is running');
        this.database.save('some data');
        
    }
}
