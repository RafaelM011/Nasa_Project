const launchProperties = new Set(["launchDate", "mission", "rocket", "target"]);
const _isValidDate = date => !isNaN(new Date(date));
const _isMissingProperties = properties => Boolean(launchProperties.difference(properties).size)

export function validateLaunch(req, res, next){
  const launch = req.body ?? {};
  const properties = new Set([...Object.keys(launch)]);

  if(_isMissingProperties(properties)) return res.status(400).json({error: "Missing launch properties"});
  else if(!_isValidDate(launch.launchDate)) return res.status(400).json({error: "Invalid date format"});
  return next();
}
