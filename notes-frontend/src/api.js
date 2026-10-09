export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Small internal helper so every function doesn't repeat itself
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

// GET all notes
export function fetchNotes() {
  return request("/notes");
}

// CREATE a note
export function createNote({ body= "New Note", colors, position }) {

  const note = {};
  note.body = JSON.stringify(body);
  note.colors = JSON.stringify(colors);
  note.position = JSON.stringify(position);
  return request("/notes", {
    method: "POST",
    body: JSON.stringify({note}),
  });
}

// UPDATE a note (e.g. new position after dragging)
export function updateNote(id, { body, colors, position }) {
  const note = {};
  if (body !== undefined) note.body = JSON.stringify(body);
  if (colors !== undefined) note.colors = JSON.stringify(colors);
  if (position !== undefined) note.position = JSON.stringify(position);

  return request(`/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ note }),
  });
}

// DELETE a note
export function deleteNote(id) {
  return request(`/notes/${id}`, { method: "DELETE" });
}