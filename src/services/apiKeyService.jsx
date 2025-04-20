const API = "";

export async function listMyKeys(token) {
  const res = await fetch(`${API}/api-keys`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function generateKey(token) {
  const res = await fetch(`${API}/api-keys`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
