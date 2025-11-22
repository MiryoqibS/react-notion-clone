import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { notesContext } from "../context/notesContext";

// иконки
import { FiSettings, FiPlusCircle, FiTrash } from "react-icons/fi";
import { NotesListBar } from "./NotesListBar";

export const NavBar = () => {
    const { notes, addPage } = useContext(notesContext);
    const navLinkClass = ({ isActive }) => {
        return `flex items-center gap-4 font-medium text-lg  ${isActive ? "text-gray-700" : "text-gray-500"}`;
    };
    const navigate = useNavigate();

    return (
        <nav className="flex flex-col gap-2">
            <NavLink className={navLinkClass} to="/settings">
                <FiSettings size={18} />
                Settings
            </NavLink>

            <div className="flex flex-col gap-4">
                <button
                    className="flex items-center gap-4 font-medium text-lg text-gray-500"
                    onClick={() => {
                        const id = addPage();
                        navigate(`/editNote/${id}`)
                    }}
                >
                    <FiPlusCircle size={18} />
                    New page
                </button>

                {Array.isArray(notes) && notes.length > 0 && <NotesListBar notes={notes}/>}
            </div>

            <NavLink className={navLinkClass} to="/trash">
                <FiTrash size={18} />
                Trash
            </NavLink>
        </nav>
    )
}
