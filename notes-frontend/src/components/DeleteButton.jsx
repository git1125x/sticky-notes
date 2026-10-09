import { useContext } from 'react'
import Trash from '../icons/Trash'
import { deleteNote } from '../api'
import { NoteContext } from '../context/NoteContext'

const DeleteButton = ({noteId}) => {
  const {setNotes} = useContext(NoteContext)
  
  const handleDelete = async () => {
    deleteNote(noteId);
    setNotes((prevState) => 
        prevState.filter((note) => note.id != noteId)
    );
  }
  return (
    <div onClick={handleDelete}><Trash/></div>
  )
}

export default DeleteButton
