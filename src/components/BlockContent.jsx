import { GoTrash } from "react-icons/go";

export const BlockContent = ({ children }) => {
    return (
        <div className="flex items-center gap-2 group">
            {/* Управление контентом */}
            <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-500">
                <button
                    className="flex items-center justify-center cursor-pointer hover:text-red-700 transition-colors"
                ><GoTrash size={16} /></button>
            </div>

            {/* контент */}
            {children}
        </div>
    )
}
