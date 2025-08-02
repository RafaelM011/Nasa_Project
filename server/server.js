import 'dotenv/config';
import http from "http";
import app from "./src/app.js";

global.__dirname = import.meta.dirname;

const PORT = process.env.PORT || 4000;
const MONGO_URL = "mongodb+srv://rafaelmartinez011dev:Julio11@nasa-project.hcuhty9.mongodb.net/?retryWrites=true&w=majority&appName=Nasa-Project";

http.createServer(app).listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
