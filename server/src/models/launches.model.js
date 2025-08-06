import launches from './launches.mongo.js';

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

(async function(){
  await launches.updateOne(launch,launch,{upsert: true});
})()

export async function getAllLaunches(){
  const launchesArray = await launches.find({}, {"_id": 0, "__v": 0});

  return launchesArray;
}

export async function addLaunch(launch){
  await launches.insertOne({...launch, flightNumber: 1 + (await getLastFlightNumber()), customers: [], upcoming: true, success: true});
}

async function getLastFlightNumber() {
  const launch = await launches.findOne().sort("-flightNumber");

  return launch.flightNumber;
}

export async function deleteLaunch(launchId){
  const launchExists = await launches.exists({flightNumber: launchId});
  if(!launchExists) return false;

  await launches.deleteOne({flightNumber: launchId});

  return true;
}
