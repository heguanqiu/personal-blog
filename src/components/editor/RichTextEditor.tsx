"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

type RichTextEditorProps = {
  name: string;
  initialValue?: string;
  placeholder?: string;
};

const controls = [
  { label: "加粗", command: "bold" },
  { label: "斜体", command: "italic" },
  { label: "标题", command: "heading" },
  { label: "列表", command: "bullet" },
  { label: "引用", command: "quote" },
  { label: "代码", command: "code" },
];

export function RichTextEditor({
  name,
  initialValue = "<p></p>",
  placeholder = "在这里输入内容…",
}: RichTextEditorProps) {
  const [html, setHtml] = useState(initialValue);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content: initialValue,
    onUpdate: ({ editor: currentEditor }) => {
      setHtml(currentEditor.getHTML());
    },
  });

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        {controls.map((control) => (
          <button
            key={control.label}
            type="button"
            className="btn btn-secondary px-4 py-2 text-sm"
            onClick={() => {
              if (!editor) {
                return;
              }
              switch (control.command) {
                case "bold":
                  editor.chain().focus().toggleBold().run();
                  break;
                case "italic":
                  editor.chain().focus().toggleItalic().run();
                  break;
                case "heading":
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                  break;
                case "bullet":
                  editor.chain().focus().toggleBulletList().run();
                  break;
                case "quote":
                  editor.chain().focus().toggleBlockquote().run();
                  break;
                case "code":
                  editor.chain().focus().toggleCodeBlock().run();
                  break;
              }
            }}
          >
            {control.label}
          </button>
        ))}
      </div>
      <div className="min-h-72 rounded-[28px] border border-[var(--line)] bg-white/75 p-4">
        <EditorContent editor={editor} />
      </div>
      <textarea name={name} value={html} readOnly className="hidden" />
    </div>
  );
}
