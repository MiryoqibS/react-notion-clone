import { BlockContent } from "../BlockContent"

export const Paragraph = ({ onDelete, content }) => {
    return (
        <BlockContent onDelete={onDelete}>
            <p className="text-md">{content}</p>
        </BlockContent>
    )
};
