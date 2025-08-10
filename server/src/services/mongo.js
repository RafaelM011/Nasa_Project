import mongoose from 'mongoose';

const MONGO_URL = "mongodb+srv://rafaelmartinez011dev:Julio11@nasa-project.hcuhty9.mongodb.net/nasa_project?retryWrites=true&w=majority&appName=Nasa-Project";

mongoose.connection.once('open', () => console.log('MongoDb connection ready~!'));
mongoose.connection.on('error', console.error);

export const connectMongo = async() => await mongoose.connect(MONGO_URL);
export const disconnectMongo = async() => await mongoose.disconnect();
