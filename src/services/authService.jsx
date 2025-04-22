const API = "http://localhost:3001";

export async function loginUser({ email, password }) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function registerUser({ username, email, password }) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
}

export async function fetchUserProfile(token) {
  const res = await fetch(`${API}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function updateUserProfile(token, data) {
  const res = await fetch(`${API}/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

/*--------- Admin features ---------*/

export async function fetchAllUsers(token) {
  const res = await fetch(`${API}/auth/all-users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function deleteUser(token, userId) {
  const res = await fetch(`${API}/auth/user/${userId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
