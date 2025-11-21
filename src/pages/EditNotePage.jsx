import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react";
import { pagesContext } from "../context/pagesContext";

// Иконки
import { BsThreeDots } from "react-icons/bs"
import { SiIconify } from "react-icons/si";
import { CiImageOn } from "react-icons/ci";
import { EmojiPicker } from "../components/EmojiPicker";

export const EditNotePage = () => {
    const emptyNote = { title: "", note: null, cover: null }
    const { findNote, updateNote } = useContext(pagesContext);
    const { id } = useParams();
    const [note, setNote] = useState({ ...emptyNote });
    const navigate = useNavigate();
    const [updatedNote, setUpdatedNote] = useState({ ...note });

    const emojiPickerButtonRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [emojiPickerPos, setEmojiPickerPos] = useState({ top: 0, left: 0 });
    const onEmojiClick = (emoji) => {
        setUpdatedNote(prev => ({ ...prev, emoji }));
        setShowEmojiPicker(false);
    };
    const onCloseEmojiPicker = () => setShowEmojiPicker(false);

    const setCoverButton = useRef(null);
    const coverInputRef = useRef(null);
    const [cover, setCover] = useState(note.cover);

    useEffect(() => {
        const finedNote = findNote(id);
        if (!finedNote) navigate("/");
        setNote(finedNote);
        setUpdatedNote(finedNote);
    }, [id, findNote]);

    const handleUpdateTitle = (title) => {
        setUpdatedNote(prev => {
            const newNote = { ...prev, title };
            updateNote(id, newNote);
            return newNote;
        });
    };

    return (
        <div className="flex flex-col gap-10">
            <header className="flex items-center justify-between py-2">
                <input
                    type="text"
                    value={updatedNote.title}
                    onChange={e => handleUpdateTitle(e.target.value)}
                    className="border-none outline-none w-full"
                />

                <div className="flex items-center gap-2">
                    <button>Publish</button>
                    <button><BsThreeDots /></button>
                </div>
            </header>

            {cover && (
                <img src={cover} className="h-[400px] w-full object-cover object-top" />
            )}

            <div className="flex flex-col gap-4 w-full max-w-[600px] mx-auto">
                {showEmojiPicker && (<EmojiPicker {...emojiPickerPos} onClose={onCloseEmojiPicker} onEmojiClick={onEmojiClick} />)}

                <header className={`flex gap-4 ${updatedNote.emoji ? "flex-col items-start" : "flex-row items-center"}`}>
                    {updatedNote.emoji ? (
                        <div className="text-6xl leading-none select-none">
                            {updatedNote.emoji}
                        </div>
                    ) : (
                        <button
                            ref={emojiPickerButtonRef}
                            className="flex items-center gap-3 bg-white px-3 py-1 border text-gray-700 font-medium border-black/10 shadow-xl rounded-xl"
                            onClick={() => {
                                setShowEmojiPicker(prev => !prev);
                                const rect = emojiPickerButtonRef.current.getBoundingClientRect();
                                const xOnPage = rect.left + window.scrollX;
                                const yOnPage = rect.top + window.scrollY;
                                setEmojiPickerPos({
                                    left: xOnPage,
                                    top: yOnPage + 50,
                                })
                            }}
                        >
                            <SiIconify size={18} />
                            Add Icon
                        </button>
                    )}

                    {!cover && (
                        <button
                            className="flex items-center gap-3 bg-white px-3 py-1 border text-gray-700 font-medium border-black/10 shadow-xl rounded-xl"
                            onClick={() => coverInputRef?.current?.click()}
                        >
                            <CiImageOn size={22} />
                            Add Cover
                        </button>
                    )}

                    <input
                        type="file"
                        ref={coverInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const url = URL.createObjectURL(file);
                            setCover(url);
                        }}
                    />

                </header>
                <textarea
                    className="text-4xl font-bold text-gray-900 border-none outline-none resize-none"
                    spellCheck={false}
                    value={updatedNote.title}
                    onChange={e => handleUpdateTitle(e.target.value)}
                />
            </div>
        </div>
    )
}
