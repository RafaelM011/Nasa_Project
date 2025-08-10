import planetsDB from "./planets.mongo.js";
import {parse} from "csv-parse";
import fs from "fs";

function isHabitablePlanet(planet){
  return planet["koi_disposition"] === "CONFIRMED"
    && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11
    && planet["koi_prad"] < 1.6
}

(async function loadPlanetsData(){
    await (() =>
      new Promise( (resolve, reject) => {
        fs.createReadStream(`data/kepler_data.csv`)
          .pipe(parse({comment: "#", columns: true}))
          .on("data", async planet => {
            if(isHabitablePlanet(planet)) {
              await planetsDB.updateOne(
                {keplerName: planet.kepler_name},
                {keplerName: planet.kepler_name},
                {upsert: true}
              );
            }
          })
          .on("end", resolve)
          .on("error", reject)
      })
    )()
})()

async function getAllPlanets(){
  return await planetsDB.find({}, { "_id": 0, "__v": 0});
}

export { getAllPlanets };
