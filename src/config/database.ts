import mongoose from 'mongoose';

const connectDatabase = async (URI: string): Promise<void> => {
  try {
    await mongoose
      .connect(URI)
      .then(() => {
        console.log('Database connexion established');
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
