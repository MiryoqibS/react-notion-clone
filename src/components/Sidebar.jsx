import { SearchBar } from "./searchBar"
import { NavBar } from "./NavBar"
import { AccountBar } from "./AccountBar"

export const Sidebar = () => {
    return (
        <div className="flex flex-col gap-6 px-4 py-2 bg-gray-100">
            <AccountBar />
            <SearchBar />
            <NavBar />
        </div>
    )
}