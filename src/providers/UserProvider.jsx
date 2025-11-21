import { useState } from "react";
import { userContext } from "../context/userContext"

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: "Miryoqib Sobirov",
        avatarUrl: "",
    });

    return (
        <userContext.Provider value={{ user }}>
            {children}
        </userContext.Provider>
    );
};