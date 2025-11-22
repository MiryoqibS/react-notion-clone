import { SearchBar } from "./searchBar"
import { NavBar } from "./NavBar"
import { AccountBar } from "./AccountBar"
import { useContext, useEffect, useState } from "react"
import { NotesListBar } from "./NotesListBar"
import { notesContext } from "../context/notesContext"

export const Sidebar = () => {
    const { findNotesByTitle } = useContext(notesContext);
    const [searchNote, setSearchNote] = useState("");
    const [searchNotes, setSearchNotes] = useState([]);

    useEffect(() => {
        const notes = findNotesByTitle(searchNote);
        setSearchNotes(notes);
    }, [searchNote, findNotesByTitle]);

    const showNavbar = searchNotes.length === 0 || searchNote.length === 0;

    return (
        <div className="flex flex-col gap-6 px-4 py-2 bg-gray-100">
            <AccountBar />
            <SearchBar value={searchNote} onChange={(value) => setSearchNote(value)} />

            {showNavbar ? (<NavBar />) : (
                <NotesListBar notes={searchNotes} />
            )}
        </div>
    )
}