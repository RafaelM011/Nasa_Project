import { getAllLaunches, addLaunch, deleteLaunch } from "#models/launches.model.js";

export async function httpGetAllLaunches(_, res) {
  return res.status(200).json(await getAllLaunches());
};

export async function httpSubmitLaunch(req, res){
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);
  await addLaunch(launch);

  return res.status(201).json({data: launch, success: true});
}

export async function httpDeleteLaunch(req, res){
  const id = req.params.id;
  const deleted = await deleteLaunch(id);

  if(deleted) return res.status(200).json({data: id, success: true});
  return res.status(400).json({data: id, success: false});
}
