import { createContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { fetchNotes } from "../api";

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const contextData = { notes, setNotes, selectedNote, setSelectedNote };

  useEffect(() => {
    fetchNotes()
      .then((notes) => {
        setNotes(notes), setLoading(false);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!notes.length) return <p>Loading...</p>;

  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
