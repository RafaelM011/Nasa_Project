import {launchesDB} from './launches.mongo.js';
import { planetsDB } from './planets.mongo.js';
import axios from 'axios';

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API = "https://api.spacexdata.com/v4/launches/query";

export async function loadLaunchesData(){
  console.log("Loading launches data...");
  if(await hasLaunchesBeenFetched()) return;

  populateDatabase();
}

async function hasLaunchesBeenFetched(){
  return await launchExists({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
}

async function launchExists(filter){
  return await launchesDB.exists(filter);
}

async function populateDatabase(){
  const response = await axios.post(SPACEX_API, {
    query: {},
    options: {
      select: ["flight_number", "name", "success", "upcoming", "date_utc"],
      pagination: false,
      populate: [
        {path: "rocket", select: "name"},
        {path: "payloads", select: "customers"},
      ]
    },
  })
  const launchDocs = response.data.docs;

  launchDocs.forEach( async launchDoc => {
    const launch = formatSpaceXLaunch(launchDoc);
    await launchesDB.updateOne(launch,launch,{upsert: true});
  })
}

function formatSpaceXLaunch(launch){
  return {
      flightNumber: launch.flight_number,
      mission: launch.name,
      rocket: launch.rocket.name,
      launchDate: launch.date_utc,
      target: "", //not applicable
      customers: getCustomersFromLaunch(launch),
      upcoming: launch.upcoming,
      success: launch.success,
    };
}

function getCustomersFromLaunch(launch){
  return launch.payloads.flatMap( payload => payload.customers);
}

export async function getAllLaunches(){
  const launches = await launchesDB.find({}, {"_id": 0, "__v": 0});

  return launches;
}

export async function addLaunch(launch){
  const planetExists = await launchExists({keplerName: launch.target});
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
