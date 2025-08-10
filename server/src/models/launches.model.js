import {launchesDB} from './launches.mongo.js';
import { planetsDB } from './planets.mongo.js';

const DEFAULT_FLIGHT_NUMBER = 100;
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explore IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["NASA", "ZTM"],
  upcoming: true,
  success: true,
};

export async function bootLaunchesData(){
  await launchesDB.updateOne(launch,launch,{upsert: true});
}

export async function getAllLaunches(){
  const launches = await launchesDB.find({}, {"_id": 0, "__v": 0});

  return launches;
}

export async function addLaunch(launch){
  const planetExists = await planetsDB.exists({keplerName: launch.target});
  if(!planetExists) throw new Error("Target does not exists");

  await launchesDB.insertOne(
    {...launch,
      flightNumber: 1 + (await getLastFlightNumber()),
      customers: [],
      upcoming: true,
      success: true
    });
}

async function getLastFlightNumber() {
  const latestLaunch = await launchesDB.findOne().sort("-flightNumber");

  if(!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
  return latestLaunch.flightNumber;
}

export async function deleteLaunch(launchId){
  const launchExists = await launchesDB.exists({flightNumber: launchId});
  if(!launchExists) return false;

  await launchesDB.updateOne({flightNumber: launchId}, {success: false, upcoming: false});

  return true;
}
