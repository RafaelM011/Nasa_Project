import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connection.once('open', () => console.log('MongoDb connection ready~!'));
mongoose.connection.on('error', console.error);

export const connectMongo = async() => await mongoose.connect(process.env.MONGO_URL);
export const disconnectMongo = async() => await mongoose.disconnect();
