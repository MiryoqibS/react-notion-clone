import { BlockContent } from "../BlockContent"

export const HeadingH1 = ({ onDelete, content }) => {
    return (
        <BlockContent onDelete={onDelete}>
            <h1 className="text-4xl font-bold">{content}</h1>
        </BlockContent>
    )
}
