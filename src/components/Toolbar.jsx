function Btn({onClick, active, children}) {
    return (
        <button
            onClick={onClick}
            onMouseDown={(e) => e.preventDefault()}
            style={{
                marginRight: 6,
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid #e5e7eb",
                background: active ? "#2563eb" : "white",
                color: active ? "white" : "#333",
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s ease",
            }}
        >
            {children}
        </button>
    );
}

export default function Toolbar({editor}) {
    const setLink = () => {
        const url = prompt("링크 URL 입력");
        if (!url) return;

        editor.chain().focus().setLink({href: url}).run();
    };

    return (
        <div style={{marginBottom: 10}}>
            <Btn
                onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                active={editor.isActive("heading", {level: 1})}
            >
                H1
            </Btn>

            <Btn
                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                active={editor.isActive("heading", {level: 2})}
            >
                H2
            </Btn>

            <Btn
                onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                active={editor.isActive("heading", {level: 3})}
            >
                H3
            </Btn>

            <Btn
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive("bold")}
            >
                Bold
            </Btn>

            <Btn
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive("italic")}
            >
                Italic
            </Btn>

            <Btn
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                active={editor.isActive("underline")}
            >
                Underline
            </Btn>

            <Btn
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                active={editor.isActive("blockquote")}
            >
                Quote
            </Btn>

            <Btn onClick={setLink}>Link</Btn>
        </div>
    );
}