import { connect } from 'mongoose';

/**
 * Class that represent the connection to the MongoDB by passing the connectionString
 */
class Database {
  public connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  public async connect() {
    try {
      await connect(this.connectionString);
    } catch (error) {
      console.log('ERROR : ', error);
    }
  }
}

export default Database;
