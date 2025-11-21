import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"

export const Layout = () => {
    return (
        <div className="flex flex-row w-full">
            <Sidebar />

            <main className="px-6 w-full">
                <Outlet />
            </main>
        </div>
    );
}
