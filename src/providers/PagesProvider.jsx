import { useState } from "react"
import { pagesContext } from "../context/pagesContext"

export const PagesProvider = ({ children }) => {
    /*
        id: string
        title: string,

    */
    const [pages, setPages] = useState([])

    const generateId = () => {
        return `${Date.now()}-${Math.floor(Math.random() * 10000) + 1000}`
    }

    const addPage = () => {
        const id = generateId();
        setPages(prev => [...prev, {
            id,
            title: "Untitled",
        }]);
        return id;
    };

    const updateNote = (id, updatedNote) => {
        setPages(prev => prev.map(note => note.id == id ? updatedNote : note));
    }
    
    const findNote = (id) => {
        const note = pages.find(note => note.id === id);
        return note;
    }

    return (
        <pagesContext.Provider value={{ pages, addPage, updateNote, findNote }}>
            {children}
        </pagesContext.Provider>
    );
}
