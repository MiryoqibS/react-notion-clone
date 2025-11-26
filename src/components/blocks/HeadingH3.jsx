import { BlockContent } from "../BlockContent"

export const HeadingH3 = ({ onDelete, content }) => {
    return (
        <BlockContent onDelete={onDelete}>
            <h3 className="text-2xl font-bold">{content}</h3>
        </BlockContent>
    )
}
