import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { pagesContext } from "../context/pagesContext";

// иконки
import { FiSettings, FiPlusCircle, FiTrash } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";
import { GoFile } from "react-icons/go";
import { LuScanEye } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";

export const NavBar = () => {
    const { pages, addPage } = useContext(pagesContext);
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
                        navigate(`/editPage/${id}`)
                    }}
                >
                    <FiPlusCircle size={18} />
                    New page
                </button>

                {Array.isArray(pages) && pages.length > 0 && (
                    <div className="flex flex-col">
                        {pages.map(page => (
                            <div
                                className="flex items-center gap-2 px-2 py-1 bg-gray-200 text-gray-400 rounded"
                                key={page.id}
                                onClick={() => navigate(`/editPage/${page.id}`)}
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
                                ><span className="text-xs">{page.emoji}</span> {page.title}</p>
                                <div className="flex items-center gap-2">
                                    <button>< LuScanEye /></button>
                                    <button>< TbEdit /></button>
                                </div>
                            </div>

                        ))}
                    </div>
                )}
            </div>

            <NavLink className={navLinkClass} to="/trash">
                <FiTrash size={18} />
                Trash
            </NavLink>
        </nav>
    )
}
