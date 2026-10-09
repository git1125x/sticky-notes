import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useContext, useRef } from "react";
import { createNote, updateNote } from "../api";
import { NoteContext } from "../context/NoteContext";

const AddButton = () => {
  const {setNotes} = useContext(NoteContext);
  const startingPos = useRef(10);

  const addNote = async () => {
    console.log("addNote");
    const position = {
      x: startingPos.current,
      y: startingPos.current,
    };
    const colors = {
        "id": "color-yellow",
        "colorHeader": "#FFEFBE",
        "colorBody": "#FFF5DF",
        "colorText": "#18181A"
    };
    startingPos.current += 10;
    try {
        console.log("Try block reached.");
        const response = await createNote({ colors: colors, position: position });
        setNotes((prevNotes) => [response, ...prevNotes]);
    }  catch (e){
        console.error(e);
    }
  };
  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};

export default AddButton;
