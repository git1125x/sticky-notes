import { useRef, useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import Spinner from "../icons/Spinner";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import { updateNote } from "../api";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note }) => {
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);

  const {setSelectedNote} = useContext(NoteContext);

  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  let mouseStartPos = {x: 0, y: 0}; 
  const cardRef = useRef(null);

  const body = bodyParser(note.body);
  const textAreaRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  const mouseDown = (e) => {
    if( e.target.className === "card-header"){

      setZIndex(cardRef.current);
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;
      
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
      setSelectedNote(note);
    }
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY
    }

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir)

    setPosition(newPosition);
  };

  const mouseUp = (e) => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    updateNote(note.id, {position: newPosition});
  };

  const handleKeyUp = (e) => {
    setSaving(true)

    if (keyUpTimer.current){
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      updateNote(note.id, {body: textAreaRef.current.value});
      setSaving(false);
    }, 500)
  }

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteButton noteId={note.id} />
        {
          saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText}/>
          </div>
          )
        }
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {autoGrow(textAreaRef)}}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
          onKeyUp={handleKeyUp}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
