const API = "http://localhost:3001";

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

export async function updateKey(token, id, updates) {
  const res = await fetch(`${API}/api-keys/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  return res.json();
}

export async function deleteKey(token, id) {
  const res = await fetch(`${API}/api-keys/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
