import { BlockContent } from "../BlockContent"

export const Underline = ({ onDelete, content }) => {
    return (
        <BlockContent onDelete={onDelete}>
            <p className="text-md underline">{content}</p>
        </BlockContent>
    )
}
