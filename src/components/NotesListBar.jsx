import { useNavigate, useParams } from "react-router-dom"

// иконки
import { FaChevronRight } from "react-icons/fa";
import { GoFile } from "react-icons/go";
import { LuScanEye } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";

export const NotesListBar = ({ notes }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div className="flex flex-col">
            {notes.map(note => (
                <div
                    className={`
                        flex items-center gap-2 px-2 py-1 bg-gray-white 
                        transition-colors cursor-pointer hover:bg-gray-200 
                        text-gray-400 rounded ${id === note.id ? "bg-gray-200" : ""}`}
                    key={note.id}
                    onClick={() => navigate(`/editNote/${note.id}`)}
                >
                    <FaChevronRight size={12} />
                    <span className="text-gray-800">
                        <GoFile size={16} />
                    </span>
                    <p
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            overflowWrap: "anywhere",
                        }}
                        className="text-gray-700 font-semibold text-md w-40"
                    ><span className="text-xs">{note.emoji}</span> {note.title}</p>
                    <div className="flex items-center gap-2">
                        <button
                            className="text-gray-400 transition-colors cursor-pointer hover:text-gray-600"
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/viewNote/${note.id}`)
                            }}>< LuScanEye /></button>
                        <button
                            className="text-gray-400 transition-colors cursor-pointer hover:text-gray-600"
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/editNote/${note.id}`)
                            }
                            }>< TbEdit /></button>
                    </div>
                </div>
            ))}
        </div>
    )
}
