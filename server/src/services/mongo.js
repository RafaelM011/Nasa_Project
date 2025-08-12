import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_URL = `mongodb+srv://${process.env.MONGO_ACCOUNT}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_0}.hcuhty9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=${process.env.MONGO_CLUSTER}`;

mongoose.connection.once('open', () => console.log('MongoDb connection ready~!'));
mongoose.connection.on('error', console.error);

export const connectMongo = async() => await mongoose.connect(MONGO_URL);
export const disconnectMongo = async() => await mongoose.disconnect();
