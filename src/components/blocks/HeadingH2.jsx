import { BlockContent } from "../BlockContent"

export const HeadingH2 = ({ onDelete, content }) => {
    return (
        <BlockContent onDelete={onDelete}>
            <h2 className="text-3xl font-bold">{content}</h2>
        </BlockContent>
    )
};