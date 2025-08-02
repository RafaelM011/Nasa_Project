import { getAllLaunches, addLaunch, deleteLaunch } from "#models/launches.model..js";

export function httpGetAllLaunches(_, res) {
  return res.status(200).json(getAllLaunches());
};

export function httpSubmitLaunch(req, res){
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);
  addLaunch(launch);

  return res.status(201).json({data: launch, success: true});
}

export function httpDeleteLaunch(req, res){
  const id = req.params.id;
  const deleted = deleteLaunch(id);

  if(deleted) return res.status(200).json({data: id, success: true});
  return res.status(400).json({data: id, success: false});
}
