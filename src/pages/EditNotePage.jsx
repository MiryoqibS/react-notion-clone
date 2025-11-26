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
import { HeadingH1 } from "../components/blocks/HeadingH1";
import { HeadingH2 } from "../components/blocks/HeadingH2";
import { HeadingH3 } from "../components/blocks/HeadingH3";
import { Underline } from "../components/blocks/Underline";
import { Paragraph } from "../components/blocks/Paragraph";
import { BlockList } from "../components/blocks/BlockList";

export const EditNotePage = () => {
    // пустая заметка
    const emptyNote = {
        title: "", note: null, cover: null, blocks: [
            { id: 0, type: "text", content: "", }
        ]
    };

    // инициализация и поиск данных заметки
    const { findNote, updateNote } = useContext(notesContext);
    const { id } = useParams();
    const [note, setNote] = useState({ ...emptyNote });
    const navigate = useNavigate();
    const [updatedNote, setUpdatedNote] = useState({ ...note });

    // Изменение заголовка заметки
    const handleUpdateTitle = (title) => setUpdatedNote(prev => ({ ...prev, title }));

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

    // обработка изменение поле ввода
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

    // удаление блока контента 
    const deleteContentBlock = (id) => {
        const blocks = updatedNote.blocks;
        const updatedBlocks = blocks.filter(block => block.id !== id);
        setUpdatedNote(prev => ({ ...prev, blocks: updatedBlocks }));
    };

    // создание блока контента
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
            case "/h2":
                return {
                    id,
                    type: "h2",
                    content: blockContentText,
                }
            case "/h3":
                return {
                    id,
                    type: "h3",
                    content: blockContentText,
                }
            case "/underline":
                return {
                    id,
                    type: "underline",
                    content: blockContentText,
                }
            case "/bullet":
                return {
                    id,
                    type: "bullet",
                    items: [
                        { id: crypto.randomUUID(), text: blockContentText }
                    ],
                    input: "",
                }
            case "/numbered":
                return {
                    id,
                    type: "numbered",
                    items: [
                        { id: crypto.randomUUID(), text: blockContentText }
                    ],
                    input: "",
                }
            default:
                return {
                    id,
                    type: "text",
                    content: blockContentText,
                }
        };
    }

    // Добавление блока контента
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

    // Изменение поле добавления самого блока 
    const handleChangeBlockInput = (id, value) => {
        const blocks = updatedNote.blocks;
        const updatedBlocks = blocks.map(
            block => block.id === id ? { ...block, input: value } : block
        );
        setUpdatedNote(prev => ({ ...prev, blocks: updatedBlocks }));
    };

    // Добавления текста в список самого блока
    const handleAddItemBlock = (id) => {
        const blocks = updatedNote.blocks;
        const findBlock = blocks.find(block => block.id == id);
        if (!findBlock.input) return;
        if (findBlock.input.length === 0) return;
        const newItem = { id: crypto.randomUUID(), text: findBlock.input };
        const updatedBlock = { ...findBlock, items: [...findBlock.items, newItem] };

        setUpdatedNote(prev => ({ ...prev, blocks: prev.blocks.map(block => block.id === id ? updatedBlock : block) }));
    }

    // Поиск заметки
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

    return (
        <div className="flex flex-col gap-6">
            <header className="px-6 flex items-center justify-between py-2">
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
                <img src={updatedNote.cover} className="h-[300px] w-full object-cover object-top" />
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
                    const handleDeleteBlockContent = () => deleteContentBlock(block.id)
                    const blockContent = block.content;

                    switch (block.type) {
                        case "h1":
                            return (<HeadingH1 key={block.id} onDelete={handleDeleteBlockContent} content={blockContent} />)
                        case "h2":
                            return (<HeadingH2 key={block.id} onDelete={handleDeleteBlockContent} content={blockContent} />)
                        case "h3":
                            return (<HeadingH3 key={block.id} onDelete={handleDeleteBlockContent} content={blockContent} />)
                        case "underline":
                            return (<Underline key={block.id} onDelete={handleDeleteBlockContent} content={blockContent} />)
                        case "bullet":
                            return (<BlockList
                                type="disc"
                                key={block.id}
                                id={block.id}
                                items={block.items}
                                onDelete={handleDeleteBlockContent}
                                addItem={handleAddItemBlock}
                                onChange={handleChangeBlockInput}
                            />)
                        case "numbered":
                            return (<BlockList
                                type="decimal"
                                key={block.id}
                                id={block.id}
                                items={block.items}
                                onDelete={handleDeleteBlockContent}
                                addItem={handleAddItemBlock}
                                onChange={handleChangeBlockInput}
                            />)
                        default:
                            return (<Paragraph key={block.id} onDelete={handleDeleteBlockContent} content={blockContent} />)
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
