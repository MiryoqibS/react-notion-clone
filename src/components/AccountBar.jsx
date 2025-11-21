import { useContext } from "react";
import { userContext } from "../context/userContext";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export const AccountBar = () => {
    const { user } = useContext(userContext);

    const hasAvatar = () => {
        const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        return regex.test(user.avatarUrl);
    }

    return (
        <div className="flex items-center gap-4">
            {hasAvatar() ? (
                <img
                    src={user.avatarUrl}
                    alt={`${user.username} avatar`}
                    width={32}
                    height={32}
                />
            ) : (
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white">
                    {user.username[0]}
                </span>
            )}
            <p className="text-xl font-medium">{user.username}</p>
            <div className="flex flex-col cursor-pointer">
                <FaChevronUp size={14} />
                <FaChevronDown size={14} />
            </div>
        </div>
    )
}
