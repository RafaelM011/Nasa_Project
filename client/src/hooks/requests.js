const API_URL = "http://localhost:4000/v1";

async function httpGetPlanets() {
  const planets = await fetch(`${API_URL}/planets`);
  return await planets.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const launches = await response.json();
  return launches.sort((a,b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  const response = await fetch(`${API_URL}/launches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(launch),
  });

  return await response.json();
}

async function httpAbortLaunch(id) {
  const response = await fetch(`${API_URL}/launches/${id}`, {
    method: "DELETE",
  })

  return await response.json();
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
