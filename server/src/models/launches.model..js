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
const launches = new Map();
launches.set(launch.flightNumber, launch);

const _launchExists = launchId => launches.has(Number(launchId));

export function getAllLaunches(){
  return [...launches.values()];
}

export function addLaunch(launch){
  const flightNumber = launches.size + 100;
  launches.set(flightNumber, {...launch, flightNumber, customers: [], upcoming: true, success: true});
}

export function deleteLaunch(launchId){
  if(!_launchExists(launchId)) return false;

  const abortedLaunch = launches.get(Number(launchId));
  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;
  launches.set(abortedLaunch.flightNumber, abortedLaunch);

  return true;
}
