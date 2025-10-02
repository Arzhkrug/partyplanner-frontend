const API_URL = import.meta.env.VITE_API_URL;

export async function getEvents() {
  const res = await fetch(`${API_URL}/events`);
  return res.json();
}

export async function createEvent(eventData) {
  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  return res.json();
}

export async function joinEvent(id, name) {
  const res = await fetch(`${API_URL}/events/${id}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}
