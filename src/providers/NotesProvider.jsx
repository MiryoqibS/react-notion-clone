import { useState } from "react"
import { notesContext } from "../context/notesContext"

export const NotesProvider = ({ children }) => {
    /*
        id: string
        title: string,
        cover: string || null,
        emoji: string || null,
    */
    const [notes, setNotes] = useState([])

    const generateId = () => {
        return `${Date.now()}-${Math.floor(Math.random() * 10000) + 1000}`
    };

    const addPage = () => {
        const id = generateId();
        setNotes(prev => [...prev, {
            id,
            title: "Untitled",
            cover: null,
            emoji: null,
        }]);
        return id;
    };

    const updateNote = (id, updatedNote) => {
        setNotes(prev => prev.map(note => note.id == id ? updatedNote : note));
    }

    const findNote = (id) => {
        const note = notes.find(note => note.id === id);
        return note;
    }

    const findNotesByTitle = (searchTitle) => {
        return notes.filter(
            note =>
                note.title.toLowerCase().includes(searchTitle.toLowerCase())
        );
    }

    return (
        <notesContext.Provider value={{ notes, addPage, updateNote, findNote, findNotesByTitle }}>
            {children}
        </notesContext.Provider>
    );
}
