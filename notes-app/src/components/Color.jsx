import React, { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { updateNote } from "../api";

const Color = ({ color }) => {
  const { selectedNote, notes, setNotes } = useContext(NoteContext);
  const changeColor = () => {
    try {
      const currentNoteIndex = notes.findIndex(
        (note) => note.id === selectedNote.id
      );
      const localUpdateNote = {
        ...notes[currentNoteIndex],
        colors: JSON.stringify(color),
      };
      const newNotes = [...notes];
      newNotes[currentNoteIndex] = localUpdateNote;
      setNotes(newNotes);

      updateNote(selectedNote.id, {colors: color})
    } catch (error) {
      alert("You must select a note before changing colors.");
    }
  };

  return (
    <div
      className="color"
      onClick={changeColor}
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
};

export default Color;
