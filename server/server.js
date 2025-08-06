import 'dotenv/config';
import mongoose from 'mongoose';
import http from "http";
import app from "./src/app.js";

global.__dirname = import.meta.dirname;

const PORT = process.env.PORT || 4000;
const MONGO_URL = "mongodb+srv://rafaelmartinez011dev:Julio11@nasa-project.hcuhty9.mongodb.net/nasa_project?retryWrites=true&w=majority&appName=Nasa-Project";

mongoose.connection.once('open', () => console.log('MongoDb connection ready~!'));
mongoose.connection.on('error', console.error)  ;

async function startServer(){
  await mongoose.connect(MONGO_URL);

  http.createServer(app).listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
}

startServer();
