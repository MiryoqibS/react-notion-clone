/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react";
import { notesContext } from "../context/notesContext";

// Иконки
import { BsThreeDots } from "react-icons/bs"
import { SiIconify } from "react-icons/si";
import { CiImageOn, CiSquarePlus } from "react-icons/ci";
import { EmojiPicker } from "../components/EmojiPicker";
import { CommandTips } from "../components/CommandTips";
import { BlockContent } from "../components/BlockContent";

export const EditNotePage = () => {
    const emptyNote = {
        title: "", note: null, cover: null, blocks: [
            { id: 0, type: "text", content: "", }
        ]
    };

    const { findNote, updateNote } = useContext(notesContext);
    const { id } = useParams();
    const [note, setNote] = useState({ ...emptyNote });
    const navigate = useNavigate();
    const [updatedNote, setUpdatedNote] = useState({ ...note });

    // Эмодзи пикер
    const emojiPickerButtonRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [emojiPickerPos, setEmojiPickerPos] = useState({ top: 0, left: 0 });
    const onEmojiClick = (emoji) => {
        setUpdatedNote(prev => ({ ...prev, emoji }));
        setShowEmojiPicker(false);
    };
    const onCloseEmojiPicker = () => setShowEmojiPicker(false);

    // Обложка 
    const coverInputRef = useRef(null);
    const handleSelectCover = (file) => {
        if (!file) return;
        const url = URL.createObjectURL(file);
        setUpdatedNote(prev => ({ ...prev, cover: url }));
    };

    // Блоки контента
    const [command, setCommand] = useState("");
    const [commandTipsPos, setCommandTipsPos] = useState({ top: 0, left: 0 });
    const [showCommandTips, setShowCommandTips] = useState(false);
    const commandInputRef = useRef(null);

    const handleChangeCommandInput = (e) => {
        const rect = commandInputRef.current.getBoundingClientRect();
        const xOnPage = rect.left;
        const yOnPage = rect.top;
        setCommandTipsPos({
            left: xOnPage,
            top: yOnPage + 50,
        });

        const typedCommand = e.target.value;
        if (typedCommand.startsWith("/")) {
            setShowCommandTips(true);
        } else {
            setShowCommandTips(false);
        };

        setCommand(typedCommand);
    }

    const handleChangeBlock = (blockId, value) => {
        setUpdatedNote(prev => ({
            ...prev,
            blocks: prev.blocks.map(block => block.id === blockId ? { ...block, content: value } : block)
        }));
    };

    const createContentBlock = (cmd) => {
        const id = crypto.randomUUID();
        const hasContentType = cmd.startsWith("/");
        if (!hasContentType) {
            return {
                id,
                type: "text",
                content: cmd,
            };
        };
        const blockContentType = cmd.split(" ")[0];
        const blockContentText = cmd.split(" ").slice(1).join("");
        switch (blockContentType) {
            case "/h1":
                return {
                    id,
                    type: "h1",
                    content: blockContentText,
                }
        };
    }

    const handleAddBlock = (e) => {
        if (e.key === "Enter") {
            setUpdatedNote(prev => {
                const newBlock = createContentBlock(command);
                console.log(newBlock);

                return {
                    ...prev,
                    blocks: [...prev.blocks, newBlock]
                };
            });
            setCommand("");
            setShowCommandTips(false);
            if (e.preventDefault) {
                e.preventDefault();
            }
        };
    };

    // поиск заметки
    useEffect(() => {
        const finedNote = findNote(id);
        if (!finedNote) navigate("/");
        setNote(finedNote);
        setUpdatedNote(finedNote);
    }, [id, findNote]);

    // Обновление контекста в зависимости от обновлённой заметки
    useEffect(() => {
        if (!updatedNote) return;
        const timerId = setTimeout(() => {
            updateNote(id, updatedNote);
        }, 300);

        return () => clearTimeout(timerId);
    }, [updatedNote]);

    const handleUpdateTitle = (title) => setUpdatedNote(prev => ({ ...prev, title }));

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

            {updatedNote.cover && (
                <img src={updatedNote.cover} className="h-[400px] w-full object-cover object-top" />
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

                    {!updatedNote.cover && (
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
                        onChange={e => handleSelectCover(e.target.files[0])}
                    />

                </header>

                {/* изменение заголовка */}
                <textarea
                    className="text-4xl font-bold text-gray-900 border-none outline-none resize-none"
                    spellCheck={false}
                    value={updatedNote.title}
                    onChange={e => handleUpdateTitle(e.target.value)}
                />

                {/* Блоки контента */}
                {updatedNote.blocks.map((block) => {
                    console.log(block)
                    switch (block.type) {
                        case "h1":
                            return (<BlockContent key={block.id}><h1 className="text-4xl font-bold">{block.content}</h1></BlockContent>)
                        default:
                            return (<BlockContent key={block.id}><p>{block.content}</p></BlockContent>)
                    }
                })}

                {/* Поле для добавления блоков контента */}

                {/* Подсказки */}
                {showCommandTips && (<CommandTips {...commandTipsPos} />)}

                {/* Поле */}
                <div
                    className="flex items-center gap-2"
                    ref={commandInputRef}
                >
                    <button
                        onClick={() => handleAddBlock({ key: "Enter" })}
                        className="flex items-center justify-center cursor-pointer hover:text-green-700 transition-colors"
                    ><CiSquarePlus size={24} /></button>
                    <input
                        type="text"
                        value={command}
                        onChange={handleChangeCommandInput}
                        onKeyDown={handleAddBlock}
                        placeholder="Enter text or type '/' for commands"
                        className="outline-none border-none w-full"
                    />
                </div>
            </div>
        </div>
    )
}
