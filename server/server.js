import 'dotenv/config';
import http from "http";
import app from "./src/app.js";
import { connectMongo } from '#root/services/mongo.js';

global.__dirname = import.meta.dirname;

const PORT = process.env.PORT || 4000;

async function startServer(){
  await connectMongo();

  http.createServer(app).listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
}

startServer();
