import { FaSearch } from "react-icons/fa"

export const SearchBar = () => {
    return (
        <div className="flex items-center gap-4 text-gray-700">
            <FaSearch size={18} />
            <input
                type="search"
                placeholder="Search"
                className="outline-none border-none py-2 text-md placeholder:font-medium placeholder:text-gray-700"
            />
        </div>
    )
}
