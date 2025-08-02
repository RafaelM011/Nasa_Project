import {parse} from "csv-parse";
import fs from "fs";

const habitablePlanets = [];

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
          .on("data", planet => {
            if(isHabitablePlanet(planet)) habitablePlanets.push({kepler_name: planet.kepler_name})
          })
          .on("end", resolve)
          .on("error", reject)
      })
    )()
})()

function getAllPlanets(){
  return habitablePlanets;
}

export { getAllPlanets };
