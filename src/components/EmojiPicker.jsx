import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { MdClose } from "react-icons/md";

export const EmojiPicker = React.memo(({ top, left, onClose, onEmojiClick }) => {
    const emojis = ["🤣", "😂", "🔥", "😭", "🙂", "😁", "😨", "😕", "😇", "😔", "😐", "🙃", "🤗", "🤯", "🎉"];
    const frequentlyEmojis = ["🎉", "😂"];
    const [searchEmoji, setSearchEmoji] = useState("");

    return (
        <div
            className="flex flex-col gap-6 max-w-[300px] px-6 py-2 bg-white absolute z-50 rounded shadow border border-gray-200"
            style={{ top, left }}
        >
            <button
                className="cursor-pointer ml-auto"
                onClick={() => onClose()}
            ><MdClose size={20} /></button>

            <SearchBar />

            <div className="flex flex-col gap-2 items-start">
                <h3 className="text-gray-900 font-medium text-lg">Frequently Used</h3>
                <div className="grid grid-cols-6 gap-2 text-lg w-full">
                    {frequentlyEmojis.map((emoji, index) => (
                        <div key={index} className="cursor-pointer">
                            {emoji}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2 items-start">
                <h3 className="text-gray-900 font-medium text-lg">Emojis</h3>
                <div className="grid grid-cols-6 gap-2 text-lg w-full">
                    {emojis.map((emoji, index) => (
                        <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => onEmojiClick(emoji)}
                        >
                            {emoji}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
});