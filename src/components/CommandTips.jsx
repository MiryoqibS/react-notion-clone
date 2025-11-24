export const CommandTips = ({ top, left }) => {
    const commands = [
        {
            title: "H1",
            description: "Create Heading 1",
            syntax: "/h1"
        },
        {
            title: "H2",
            description: "Create Heading 2",
            syntax: "/h2"
        },
        {
            title: "H3",
            description: "Create Heading 3",
            syntax: "/h3"
        },
        {
            title: "Bullet List",
            description: "Create a bullet list",
            syntax: "/bullet"
        },
        {
            title: "Numbered List",
            description: "Create a numbered list",
            syntax: "/numbered"
        },
    ];

    return (
        <div
            className="flex flex-col gap-2 bg-white border-2 border-gray-900/20 shadow px-6 py-2 rounded absolute z-50"
            style={{ top, left }}
        >
            {
                commands.map((command, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <div className="font-semibold">{command.title}</div>
                        <div className="text-sm text-gray-600">{command.description} <span className="font-mono bg-gray-100 px-1 rounded">{command.syntax}</span></div>
                    </div>
                ))
            }
        </div>
    )
}
