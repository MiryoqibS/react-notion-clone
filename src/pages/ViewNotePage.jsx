import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { notesContext } from '../context/notesContext';

export const ViewNotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { findNote } = useContext(notesContext);
    const [note, setNote] = useState(null);

    useEffect(() => {
        const finedNote = findNote(id);
        if (!finedNote) navigate("/");
        setNote(finedNote);
    }, []);

    if (!note) {
        return (
            <span>Finding...</span>
        );
    };

    return (
        <div>
            {note.title}
        </div>
    )
}
