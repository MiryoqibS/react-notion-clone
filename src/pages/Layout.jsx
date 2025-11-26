import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"

export const Layout = () => {
    return (
        <div className="flex flex-row w-full">
            <Sidebar />

            <main className="w-full">
                <Outlet />
            </main>
        </div>
    );
}
