import { Database } from '../interfaces/database.interface';

export class MockDatabase implements Database {
    save(data: string): void {
        console.log(`Saving data: ${data}`);
    }
}
