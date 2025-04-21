const API = "http://localhost:3001";

export async function fetchAllCountries(apiKey) {
  const res = await fetch(`${API}/countries`, {
    headers: { "x-api-key": apiKey },
  });
  return res.json();
}

export async function fetchCountryByName(name, apiKey) {
  const res = await fetch(`${API}/countries/${encodeURIComponent(name)}`, {
    headers: { "x-api-key": apiKey },
  });
  return res.json();
}
