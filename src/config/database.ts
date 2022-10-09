import mongoose from 'mongoose';

// /**
//  * Class that represent the connection to the MongoDB by passing the connectionString
//  */
// class Database {
 
//   // constructor(connectionString: string) {
//   //   this.connectionString = connectionString;
//   // }

//   //  public connectionString: string;

//   public async connect() {
//     try {
//       await mongoose.connect(process.env.MONGODB_URI);
//     } catch (error) {
//       console.log('ERROR : ', error);
//     }
//   }
// }

// export default Database;

const connectDatabase = async (URI: string): Promise<void> => {
  try {
    await mongoose.connect(URI).then(() => {
          console.log('Database connexion established')
        }).catch(error => console.log(error));
  } catch (error) {
    console.log(error)
  }
   
}

export default connectDatabase