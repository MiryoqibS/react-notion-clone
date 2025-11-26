import { BlockContent } from "../BlockContent"
import { CiSquarePlus } from "react-icons/ci";

export const BlockList = ({
    type = "none",
    items,
    id,
    onDelete,
    onChange,
    addItem,
}) => {
    const listTypes = {
        decimal: "list-decimal",
        disc: "list-disc",
        none: "list-none",
    };

    return (
        <BlockContent onDelete={onDelete}>
            <div className="flex flex-col gap-4">
                <ul className={`flex flex-col gap-2 items-start ${listTypes[type]} pl-3`}>
                    {items.map(item => (
                        <li key={item.id}>{item.text}</li>
                    ))}
                </ul>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => addItem(id)}
                        className="flex items-center justify-center cursor-pointer hover:text-green-700 transition-colors">
                        <CiSquarePlus size={24} />
                    </button>
                    <input
                        type="text"
                        onChange={(e) => onChange(id, e.target.value)}
                        placeholder="Enter text for bullet list"
                        className="outline-none border-none w-full"
                    />
                </div>
            </div>
        </BlockContent>
    )
}
