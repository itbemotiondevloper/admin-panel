"use client";

import clsx from "clsx";
import React, { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent, JSONContent, NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Node, mergeAttributes, Extension } from "@tiptap/core";
import { Plugin, PluginKey, NodeSelection } from "@tiptap/pm/state";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  CheckSquare,
  HelpCircle,
  AlertTriangle,
  Minus,
  Video,
  ExternalLink,
  Move,
  Settings,
  Copy,
  Check,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Sparkles,
} from "lucide-react";

import MenuBar from "./MenuBar";

// --- CUSTOM TIPTAP NODES & PLUGINS ---

// 1. Notion-style Block Drag & Drop Handle Extension
const DragHandleExtension = Extension.create({
  name: "dragHandle",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("dragHandlePlugin"),
        view(editorView) {
          // Create the floating drag button element
          const handle = document.createElement("div");
          handle.className = "absolute z-50 cursor-grab p-1 hover:bg-[#2c2c2c] rounded text-[#8c8c8c] hover:text-white transition-all select-none drag-handle hidden";
          handle.style.width = "20px";
          handle.style.height = "24px";
          handle.style.display = "none";
          // Render a custom 6-dot grab grip icon
          handle.innerHTML = `
            <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none; display: block; margin: auto;">
              <circle cx="2" cy="3" r="1.5" fill="currentColor"/>
              <circle cx="2" cy="9" r="1.5" fill="currentColor"/>
              <circle cx="2" cy="15" r="1.5" fill="currentColor"/>
              <circle cx="10" cy="3" r="1.5" fill="currentColor"/>
              <circle cx="10" cy="9" r="1.5" fill="currentColor"/>
              <circle cx="10" cy="15" r="1.5" fill="currentColor"/>
            </svg>
          `;
          editorView.dom.parentNode?.appendChild(handle);

          let dragNodePos = -1;
          let draggedNodePos = -1;
          let hideTimeout: any = null;

          const showHandle = () => {
            if (hideTimeout) clearTimeout(hideTimeout);
            handle.style.display = "block";
          };

          const hideHandle = () => {
            if (hideTimeout) clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
              handle.style.display = "none";
            }, 350); // 350ms buffer to allow cursor to reach handle
          };

          const handleMouseMove = (e: MouseEvent) => {
            if (!editorView.editable) return;
            const dom = e.target as HTMLElement;
            const editorDom = editorView.dom;
            
            // Keep open if over handle itself
            if (dom === handle || handle.contains(dom)) {
              showHandle();
              return;
            }

            if (!editorDom.contains(dom)) {
              hideHandle();
              return;
            }

            // Move up parents until direct child block of editor
            let blockEl: HTMLElement | null = dom;
            while (blockEl && blockEl.parentNode !== editorDom && blockEl !== editorDom) {
              blockEl = blockEl.parentNode as HTMLElement | null;
            }

            if (!blockEl || blockEl === editorDom || blockEl.tagName === "TD" || blockEl.tagName === "TH") {
              hideHandle();
              return;
            }

            const pos = editorView.posAtDOM(blockEl, 0);
            if (pos < 0) {
              hideHandle();
              return;
            }
            dragNodePos = pos;

            const rect = blockEl.getBoundingClientRect();
            const editorRect = editorDom.getBoundingClientRect();
            
            showHandle();
            handle.style.top = `${rect.top - editorRect.top + editorDom.scrollTop + 4}px`;
            handle.style.left = `-24px`;
          };

          const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (dragNodePos < 0) return;
            
            const node = editorView.state.doc.nodeAt(dragNodePos);
            if (!node) return;

            const { tr } = editorView.state;
            const selection = NodeSelection.create(editorView.state.doc, dragNodePos);
            editorView.dispatch(tr.setSelection(selection));
            editorView.focus();
            
            handle.setAttribute("draggable", "true");
          };

          const handleDragStart = (e: DragEvent) => {
            if (dragNodePos < 0) return;
            
            const node = editorView.state.doc.nodeAt(dragNodePos);
            if (!node) return;

            draggedNodePos = dragNodePos;

            const selection = NodeSelection.create(editorView.state.doc, dragNodePos);
            editorView.dispatch(editorView.state.tr.setSelection(selection));
            
            e.dataTransfer?.setData("text/plain", selection.node.textContent);
            e.dataTransfer!.effectAllowed = "move";
          };

          const handleDragEnd = () => {
            handle.setAttribute("draggable", "false");
          };

          const handleDrop = (e: DragEvent) => {
            if (draggedNodePos < 0) return;
            
            const coords = { left: e.clientX, top: e.clientY };
            const dropPosResult = editorView.posAtCoords(coords);
            if (!dropPosResult) return;
            
            e.preventDefault();
            e.stopPropagation();

            const { state, dispatch } = editorView;
            const nodeToMove = state.doc.nodeAt(draggedNodePos);
            if (!nodeToMove) return;

            const tr = state.tr;
            
            // Delete original node first
            tr.delete(draggedNodePos, draggedNodePos + nodeToMove.nodeSize);
            
            // Calculate new drop position in the updated document
            let targetPos = dropPosResult.pos;
            if (targetPos > draggedNodePos) {
              targetPos = Math.max(0, targetPos - nodeToMove.nodeSize);
            }
            
            // Insert node at targetPos
            tr.insert(targetPos, nodeToMove);
            dispatch(tr);
            
            draggedNodePos = -1;
            handle.style.display = "none";
          };

          document.addEventListener("mousemove", handleMouseMove);
          handle.addEventListener("mousedown", handleMouseDown);
          handle.addEventListener("dragstart", handleDragStart);
          handle.addEventListener("dragend", handleDragEnd);
          handle.addEventListener("mouseenter", showHandle);
          handle.addEventListener("mouseleave", hideHandle);
          editorView.dom.addEventListener("drop", handleDrop);
          editorView.dom.addEventListener("dragover", (event) => event.preventDefault());

          return {
            destroy() {
              handle.remove();
              document.removeEventListener("mousemove", handleMouseMove);
              editorView.dom.removeEventListener("drop", handleDrop);
            }
          };
        }
      })
    ];
  }
});

// 2. Custom Code Block with language settings and copy controls
const CustomCodeBlockNode = Node.create({
  name: "codeBlockCustom",
  group: "block",
  content: "text*",
  marks: "",
  code: true,
  defining: true,
  addAttributes() {
    return {
      language: { default: "javascript" },
    };
  },
  parseHTML() {
    return [{ tag: "pre" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["pre", { class: "bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-4 font-mono text-sm text-[#d4d4d4] overflow-x-auto relative" },
      ["code", { class: `language-${HTMLAttributes.language}` }, 0]
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockView);
  },
});

const CodeBlockView: React.FC<any> = ({ node, updateAttributes }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const text = node.textContent;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <NodeViewWrapper className="code-block-wrapper relative group my-6">
      <div className="absolute right-3 top-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-[#202020] border border-[#2d2d2d] rounded p-1">
        <select
          value={node.attrs.language || "javascript"}
          onChange={e => updateAttributes({ language: e.target.value })}
          className="bg-transparent text-xs text-[#8c8c8c] hover:text-white border-none outline-none focus:ring-0 p-0 pr-6 select-none cursor-pointer"
        >
          <option value="javascript" className="bg-[#202020]">JavaScript</option>
          <option value="typescript" className="bg-[#202020]">TypeScript</option>
          <option value="html" className="bg-[#202020]">HTML</option>
          <option value="css" className="bg-[#202020]">CSS</option>
          <option value="python" className="bg-[#202020]">Python</option>
          <option value="json" className="bg-[#202020]">JSON</option>
          <option value="bash" className="bg-[#202020]">Bash</option>
        </select>
        <div className="w-[1px] h-3 bg-[#2d2d2d]" />
        <button
          type="button"
          onClick={handleCopy}
          className="text-[#8c8c8c] hover:text-white p-0.5 rounded transition-all cursor-pointer hover:bg-[#2c2c2c]"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
      </div>
      <pre className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-4 font-mono text-sm text-[#d4d4d4] overflow-x-auto">
        <NodeViewContent as="div" className={`language-${node.attrs.language}`} />
      </pre>
    </NodeViewWrapper>
  );
};

// 3. Custom Image Block with resize presets, alt tags, and captioning
const CustomImageNode = Node.create({
  name: "imageCustom",
  group: "block",
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: "" },
      alt: { default: "" },
      caption: { default: "" },
      width: { default: "100%" },
    };
  },
  parseHTML() {
    return [{ tag: "div[data-type='image-custom'] img" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", { "data-type": "image-custom", class: "my-6 flex flex-col items-center" },
      ["img", { src: HTMLAttributes.src, alt: HTMLAttributes.alt, style: `width: ${HTMLAttributes.width}` }]
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },
});

const ImageView: React.FC<any> = ({ node, updateAttributes }) => {
  const [width, setWidth] = useState(node.attrs.width || "100%");
  const [showSettings, setShowSettings] = useState(false);

  const handleWidthChange = (val: string) => {
    setWidth(val);
    updateAttributes({ width: val });
  };

  return (
    <NodeViewWrapper className="image-block-wrapper my-6 flex flex-col items-center">
      <div className="relative group max-w-full border border-[#2d2d2d] rounded-lg overflow-hidden bg-[#202020]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ""}
          style={{ width: width }}
          className="rounded-lg object-contain max-h-[450px] transition-all duration-300"
        />
        
        {/* Resize controls overlay */}
        <div className="absolute right-3 top-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {["50%", "75%", "100%"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleWidthChange(size)}
              className={clsx(
                "bg-[#202020] border border-[#2d2d2d] text-xs text-[#8c8c8c] hover:text-white px-2 py-1 rounded cursor-pointer",
                width === size && "text-[#2eaadc] border-[#2eaadc]"
              )}
            >
              {size}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="bg-[#202020] border border-[#2d2d2d] p-1 rounded text-[#8c8c8c] hover:text-white cursor-pointer"
          >
            <Settings size={14} />
          </button>
        </div>

        {/* Configurations panel */}
        {showSettings && (
          <div className="absolute inset-x-0 bottom-0 bg-[#202020]/95 border-t border-[#2d2d2d] p-3 flex flex-col gap-2 z-10 text-xs text-white">
            <div className="flex items-center gap-2">
              <span className="w-12 text-[#8c8c8c]">Alt Text</span>
              <input
                type="text"
                placeholder="Alt description for search engines..."
                value={node.attrs.alt || ""}
                onChange={e => updateAttributes({ alt: e.target.value })}
                className="bg-[#191919] border border-[#2d2d2d] rounded px-2 py-1 flex-1 text-white outline-none focus:border-[#2eaadc]"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-[#8c8c8c]">Caption</span>
              <input
                type="text"
                placeholder="Image caption..."
                value={node.attrs.caption || ""}
                onChange={e => updateAttributes({ caption: e.target.value })}
                className="bg-[#191919] border border-[#2d2d2d] rounded px-2 py-1 flex-1 text-white outline-none focus:border-[#2eaadc]"
              />
            </div>
          </div>
        )}
      </div>
      {node.attrs.caption && (
        <span className="text-xs text-[#8c8c8c] mt-2 italic">{node.attrs.caption}</span>
      )}
    </NodeViewWrapper>
  );
};

// 4. Custom Callout nodes (Info, warning, success, note)
const CalloutNode = Node.create({
  name: "callout",
  group: "block",
  content: "paragraph+",
  defining: true,
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      type: { default: "info" },
    };
  },
  parseHTML() {
    return [{ tag: "div[data-type='callout']" }];
  },
  renderHTML({ HTMLAttributes }) {
    const type = HTMLAttributes.type || "info";
    let classes = "callout p-4 rounded-lg border my-4 flex flex-col gap-1 ";
    if (type === "warning") classes += "bg-yellow-950/20 border-yellow-900/40 text-yellow-300";
    else if (type === "success") classes += "bg-green-950/20 border-green-900/40 text-green-300";
    else if (type === "note") classes += "bg-blue-950/20 border-blue-900/40 text-blue-300";
    else classes += "bg-blue-950/20 border-blue-900/40 text-blue-300";

    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "callout", class: classes }), 0];
  },
});

// 5. YouTube Video embed block
const YouTubeNode = Node.create({
  name: "youtube",
  group: "block",
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: "" },
    };
  },
  parseHTML() {
    return [{ tag: "iframe[src*='youtube.com'], iframe[src*='youtu.be']" }];
  },
  renderHTML({ HTMLAttributes }) {
    let src = HTMLAttributes.src;
    if (!src) {
      return ["div", { class: "py-8 border border-dashed border-[#2d2d2d] rounded-lg text-center text-xs text-[#8c8c8c]" }, "Enter YouTube embed URL..."];
    }
    if (src.includes("watch?v=")) {
      src = src.replace("watch?v=", "embed/");
    } else if (src.includes("youtu.be/")) {
      src = src.replace("youtu.be/", "youtube.com/embed/");
    }
    return ["div", { class: "video-wrapper aspect-video my-6" },
      ["iframe", { src: src, class: "w-full h-full rounded-md border border-[#2d2d2d]", frameborder: "0", allowfullscreen: "true" }]
    ];
  },
});

// 6. Button Link Block
const ButtonNode = Node.create({
  name: "buttonBlock",
  group: "block",
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      text: { default: "Click here" },
      url: { default: "#" },
      align: { default: "center" },
    };
  },
  parseHTML() {
    return [{ tag: "div[data-type='button-block']" }];
  },
  renderHTML({ HTMLAttributes }) {
    const align = HTMLAttributes.align || "center";
    return ["div", { "data-type": "button-block", class: `my-4 flex justify-${align}` },
      ["a", {
        href: HTMLAttributes.url,
        target: "_blank",
        class: "bg-[#2eaadc] hover:bg-[#1a93c4] text-white font-semibold py-2 px-6 rounded text-sm transition-all inline-block no-underline"
      }, HTMLAttributes.text]
    ];
  },
});

// 7. Spacer Node
const SpacerNode = Node.create({
  name: "spacer",
  group: "block",
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      height: { default: "32px" },
    };
  },
  parseHTML() {
    return [{ tag: "div[data-type='spacer']" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", { "data-type": "spacer", class: "spacer-block w-full border-t border-dashed border-[#2d2d2d]/30 hover:border-[#2eaadc]/50 transition-all", style: `height: ${HTMLAttributes.height}` }];
  },
});

// --- EDITOR INTERFACE IMPLEMENTATION ---

interface RichEditorProps {
  className?: string;
  onValueChange?: (value: JSONContent) => void;
  onValidChange?: (isValid: boolean) => void;
  onRawValueChange?: (value: string) => void;
  defaultValue?: string;
  notionMode?: boolean;
  editable?: boolean;
}

interface SlashCommand {
  label: string;
  description: string;
  icon: React.ReactNode;
  action: (editor: any) => void;
}

const RichEditor: React.FC<RichEditorProps> = ({
  className,
  onValueChange,
  onValidChange,
  onRawValueChange,
  defaultValue,
  notionMode = false,
  editable = true,
}) => {
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [slashSearch, setSlashSearch] = useState("");
  const [slashCoords, setSlashCoords] = useState({ top: 0, left: 0 });
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  
  const [bubbleMenuOpen, setBubbleMenuOpen] = useState(false);
  const [bubbleCoords, setBubbleCoords] = useState({ top: 0, left: 0 });

  const [activeTextColor, setActiveTextColor] = useState("#e3e3e3");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const slashMenuRef = useRef<HTMLDivElement>(null);
  const bubbleMenuRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Modal dialog states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState<
    { key: string; label: string; placeholder: string; type: string; defaultValue?: string }[]
  >([]);
  const [modalValues, setModalValues] = useState<Record<string, string>>({});
  const [modalSubmitLabel, setModalSubmitLabel] = useState("");
  const [modalOnSubmit, setModalOnSubmit] = useState<(values: Record<string, string>) => void>(() => () => {});

  const openModal = ({
    title,
    submitLabel,
    fields,
    onSubmit,
  }: {
    title: string;
    submitLabel: string;
    fields: { key: string; label: string; placeholder: string; type: string; defaultValue?: string }[];
    onSubmit: (values: Record<string, string>) => void;
  }) => {
    setModalTitle(title);
    setModalSubmitLabel(submitLabel);
    setModalFields(fields);
    const initialVals: Record<string, string> = {};
    fields.forEach((f) => {
      initialVals[f.key] = f.defaultValue || "";
    });
    setModalValues(initialVals);
    setModalOnSubmit(() => onSubmit);
    setModalOpen(true);
  };

  // Notion commands registry
  const commands: SlashCommand[] = [
    {
      label: "Heading 1",
      description: "Large section heading",
      icon: <Heading1 className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      description: "Medium section heading",
      icon: <Heading2 className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      description: "Small section heading",
      icon: <Heading3 className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: "Paragraph",
      description: "Plain text paragraph block",
      icon: <AlignLeft className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().setParagraph().run(),
    },
    {
      label: "Checklist",
      description: "Task checklist with interactive boxes",
      icon: <CheckSquare className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().toggleTaskList().run(),
    },
    {
      label: "Bulleted list",
      description: "Standard bullet item list",
      icon: <List className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Numbered list",
      description: "List numbers block formatting",
      icon: <ListOrdered className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "Quote",
      description: "Capture quotes inside styled margins",
      icon: <Quote className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      label: "Divider",
      description: "Horizontal border line spacing element",
      icon: <Minus className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      label: "Code Block",
      description: "Interactive black script container box",
      icon: <Code className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().insertContent({ type: "codeBlockCustom" }).run(),
    },
    {
      label: "Image",
      description: "Embed graphic image block",
      icon: <Settings className="size-4 text-white" />,
      action: (editor) => {
        openModal({
          title: "Insert Image",
          submitLabel: "Insert Image",
          fields: [
            { key: "src", label: "Image URL", placeholder: "https://example.com/image.jpg", type: "url" },
            { key: "alt", label: "Alt Text (for SEO)", placeholder: "Optional description...", type: "text" },
            { key: "caption", label: "Caption", placeholder: "Optional caption text...", type: "text" }
          ],
          onSubmit: (values) => {
            const { src, alt, caption } = values;
            if (src) {
              editor.chain().focus().insertContent({
                type: "imageCustom",
                attrs: { src, alt: alt || "", caption: caption || "", width: "100" }
              }).run();
            }
          }
        });
      },
    },
    {
      label: "Table",
      description: "Add grid table element with header",
      icon: <Sparkles className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      label: "Callout Info",
      description: "Help info block highlighting",
      icon: <HelpCircle className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().insertContent({
        type: "callout",
        attrs: { type: "info" },
        content: [{ type: "paragraph", content: [{ type: "text", text: "Info block content text..." }] }]
      }).run(),
    },
    {
      label: "Callout Warning",
      description: "Danger warning banner highlight styling",
      icon: <AlertTriangle className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().insertContent({
        type: "callout",
        attrs: { type: "warning" },
        content: [{ type: "paragraph", content: [{ type: "text", text: "Warning alert text..." }] }]
      }).run(),
    },
    {
      label: "Embed YouTube",
      description: "Include a YouTube iframe media player",
      icon: <Video className="size-4 text-white" />,
      action: (editor) => {
        openModal({
          title: "Embed YouTube Video",
          submitLabel: "Embed Video",
          fields: [
            { key: "url", label: "YouTube Video URL", placeholder: "https://www.youtube.com/watch?v=...", type: "url" }
          ],
          onSubmit: (values) => {
            const { url } = values;
            if (url) {
              editor.chain().focus().insertContent({
                type: "youtube",
                attrs: { src: url }
              }).run();
            }
          }
        });
      },
    },
    {
      label: "Link Button",
      description: "Clickable call-to-action button element",
      icon: <ExternalLink className="size-4 text-white" />,
      action: (editor) => {
        openModal({
          title: "Create CTA Button",
          submitLabel: "Add Button",
          fields: [
            { key: "text", label: "Button Label", placeholder: "Click here", type: "text" },
            { key: "url", label: "Target Link URL", placeholder: "https://...", type: "url" }
          ],
          onSubmit: (values) => {
            const { text, url } = values;
            if (text && url) {
              editor.chain().focus().insertContent({
                type: "buttonBlock",
                attrs: { text, url }
              }).run();
            }
          }
        });
      },
    },
    {
      label: "Spacer",
      description: "Empty vertical layout spacer block",
      icon: <Move className="size-4 text-white" />,
      action: (editor) => editor.chain().focus().insertContent({ type: "spacer" }).run(),
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(slashSearch.toLowerCase())
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc ml-5 space-y-1 my-3" } },
        orderedList: { HTMLAttributes: { class: "list-decimal ml-5 space-y-1 my-3" } },
        codeBlock: false,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Highlight.configure({
        multicolor: true,
      }),

      Underline,

      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#2eaadc] underline hover:text-[#1a93c4] cursor-pointer",
        },
      }),

      TextStyle,

      Color,

      CharacterCount,

      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse border border-[#2d2d2d] my-6 w-full text-sm",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "bg-[#252525] border border-[#2d2d2d] p-2 text-left text-white font-semibold",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-[#2d2d2d] p-2 text-[#e3e3e3] bg-[#1d1d1d]",
        },
      }),

      TaskList.configure({
        HTMLAttributes: {
          class: "task-list-wrapper list-none p-0 my-4 space-y-2",
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex gap-3 items-start pl-1",
        },
      }),

      Placeholder.configure({
        placeholder: notionMode
          ? "Type '/' to get more text options..."
          : "Start writing your blog content...",
      }),

      // Custom extensions & drag handle
      CustomCodeBlockNode,
      CustomImageNode,
      CalloutNode,
      YouTubeNode,
      ButtonNode,
      SpacerNode,
      DragHandleExtension,
    ],
    content: (() => {
      if (!defaultValue) {
        return "";
      }
      try {
        // If it's stored as a JSON string, parse it. Otherwise, return the HTML string directly.
        return JSON.parse(defaultValue);
      } catch {
        return defaultValue;
      }
    })(),
    immediatelyRender: false,
    editable: editable,
    editorProps: {
      attributes: {
        class: clsx(
          "min-h-[500px] border-none focus:outline-none w-full text-[#e3e3e3] text-base leading-relaxed space-y-4",
          "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:my-5 [&_h1]:tracking-tight",
          "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:my-4 [&_h2]:tracking-tight",
          "[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:my-3",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-[#2eaadc] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#8c8c8c] [&_blockquote]:my-5",
          "[&_hr]:border-[#2d2d2d] [&_hr]:my-6",
        ),
      },
      handleKeyDown: (view, event) => {
        // 1. Searchable slash list keyboard bindings
        if (slashMenuOpen) {
          if (event.key === "ArrowDown") {
            setSelectedCommandIndex((prev) => (prev + 1) % filteredCommands.length);
            event.preventDefault();
            return true;
          }
          if (event.key === "ArrowUp") {
            setSelectedCommandIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            event.preventDefault();
            return true;
          }
          if (event.key === "Enter") {
            if (filteredCommands.length > 0) {
              const command = filteredCommands[selectedCommandIndex];
              executeSlashCommand(command);
            }
            event.preventDefault();
            return true;
          }
          if (event.key === "Escape") {
            setSlashMenuOpen(false);
            event.preventDefault();
            return true;
          }
        }

        // 2. Global custom editor shortcuts
        if ((event.ctrlKey || event.metaKey) && event.key === "s") {
          event.preventDefault();
          const saveBtn = document.querySelector("#save-draft-btn") as HTMLButtonElement;
          if (saveBtn) {
            saveBtn.click();
          } else {
            const publishBtn = document.querySelector("#publish-btn") as HTMLButtonElement;
            if (publishBtn) publishBtn.click();
          }
          return true;
        }

        if ((event.ctrlKey || event.metaKey) && event.key === "k") {
          event.preventDefault();
          const url = prompt("Enter link URL:");
          if (url) {
            editor?.chain().focus().setLink({ href: url }).run();
          } else if (url === "") {
            editor?.chain().focus().unsetLink().run();
          }
          return true;
        }

        if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "7") {
          event.preventDefault();
          editor?.chain().focus().toggleOrderedList().run();
          return true;
        }

        if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "8") {
          event.preventDefault();
          editor?.chain().focus().toggleBulletList().run();
          return true;
        }

        return false;
      },
    },
    onSelectionUpdate: ({ editor }) => {
      if (notionMode) {
        const { state } = editor;
        const { selection } = state;
        if (selection.empty) {
          setBubbleMenuOpen(false);
          return;
        }

        try {
          const { view } = editor;
          const coords = view.coordsAtPos(selection.from);
          const container = editorContainerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            setBubbleCoords({
              top: coords.top - rect.top + container.scrollTop - 52,
              left: Math.max(10, coords.left - rect.left - 50),
            });
            setBubbleMenuOpen(true);
          }
        } catch (e) {
          console.error("Coords tracking error:", e);
        }
      }
    },
    onUpdate: ({ editor }) => {
      if (onValueChange) onValueChange(editor.getJSON());
      const html = editor.getHTML();
      onValidChange?.(editor.getText().trim().length > 0);
      if (onRawValueChange) onRawValueChange(html);

      // Detect slash trigger
      if (notionMode) {
        const { state } = editor;
        const { selection } = state;
        const $from = selection.$from;
        
        const currentLineText = $from.parent.textBetween(
          0,
          $from.parentOffset,
          undefined,
          "\0"
        );

        const lastSlashIndex = currentLineText.lastIndexOf("/");
        if (lastSlashIndex !== -1) {
          const searchVal = currentLineText.slice(lastSlashIndex + 1);
          setSlashSearch(searchVal);
          
          const { view } = editor;
          try {
            const coords = view.coordsAtPos(selection.from);
            const container = editorContainerRef.current;
            if (container) {
              const rect = container.getBoundingClientRect();
              setSlashCoords({
                top: coords.top - rect.top + container.scrollTop,
                left: coords.left - rect.left,
              });
              setSlashMenuOpen(true);
            }
          } catch (e) {
            console.error("Slash coordinate error:", e);
          }
        } else {
          setSlashMenuOpen(false);
        }
      }
    },
  });

  const executeSlashCommand = (command: SlashCommand) => {
    if (!editor) return;

    const { selection } = editor.state;
    const $from = selection.$from;
    const currentLineText = $from.parent.textBetween(0, $from.parentOffset, undefined, "\0");
    const lastSlashIndex = currentLineText.lastIndexOf("/");

    const startPos = selection.from - (currentLineText.length - lastSlashIndex);
    const endPos = selection.from;

    editor
      .chain()
      .focus()
      .deleteRange({ from: startPos, to: endPos })
      .run();

    command.action(editor);
    setSlashMenuOpen(false);
    setSlashSearch("");
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as any;
      if (
        slashMenuOpen &&
        slashMenuRef.current &&
        !slashMenuRef.current.contains(target)
      ) {
        setSlashMenuOpen(false);
      }
      if (
        bubbleMenuOpen &&
        bubbleMenuRef.current &&
        !bubbleMenuRef.current.contains(target)
      ) {
        setBubbleMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [slashMenuOpen, bubbleMenuOpen]);

  useEffect(() => {
    if (!editor || !defaultValue) return;
    
    // Check if the current editor content matches the defaultValue.
    // If not, update it dynamically (supports both JSON and raw HTML strings)
    const currentHtml = editor.getHTML();
    const currentJson = JSON.stringify(editor.getJSON());
    if (defaultValue !== currentHtml && defaultValue !== currentJson) {
      try {
        const parsed = JSON.parse(defaultValue);
        editor.commands.setContent(parsed, { emitUpdate: false });
      } catch {
        editor.commands.setContent(defaultValue, { emitUpdate: false });
      }
    }
  }, [defaultValue, editor]);

  useEffect(() => {
    setSelectedCommandIndex(0);
  }, [slashSearch]);

  const applyTextColor = (color: string) => {
    if (!editor) return;
    editor.chain().focus().setColor(color).run();
    setActiveTextColor(color);
    setShowColorPicker(false);
  };

  const applyHighlight = (color: string) => {
    if (!editor) return;
    editor.chain().focus().setHighlight({ color }).run();
    setShowColorPicker(false);
  };

  const colors = [
    { label: "White", val: "#e3e3e3" },
    { label: "Gray", val: "#8c8c8c" },
    { label: "Blue", val: "#2eaadc" },
    { label: "Green", val: "#10b981" },
    { label: "Yellow", val: "#fbbf24" },
    { label: "Red", val: "#f87171" },
  ];

  const bgColors = [
    { label: "Gray", val: "#2c2c2c" },
    { label: "Blue", val: "#2eaadc2a" },
    { label: "Green", val: "#10b9812a" },
    { label: "Yellow", val: "#fbbf242a" },
    { label: "Red", val: "#f871712a" },
  ];

  return (
    <div
      ref={editorContainerRef}
      className={clsx("rich-editorjs w-full relative", className)}
    >
      {/* Notion Mode hides the fixed top MenuBar */}
      {!notionMode && <MenuBar editor={editor} />}

      {/* Floating Selection Bubble Menu */}
      {notionMode && bubbleMenuOpen && editor && (
        <div
          ref={bubbleMenuRef}
          className="absolute z-50 flex items-center gap-1 bg-[#202020] border border-[#2d2d2d] rounded-md shadow-2xl px-1.5 py-1 select-none animate-in fade-in slide-in-from-bottom-2 duration-150"
          style={{
            top: `${bubbleCoords.top}px`,
            left: `${bubbleCoords.left}px`,
          }}
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={clsx(
              "p-1 rounded text-[#8c8c8c] hover:text-white hover:bg-[#2c2c2c] transition-all cursor-pointer",
              editor.isActive("bold") && "text-[#2eaadc] bg-[#2eaadc]/15"
            )}
            title="Bold"
          >
            <Bold size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={clsx(
              "p-1 rounded text-[#8c8c8c] hover:text-white hover:bg-[#2c2c2c] transition-all cursor-pointer",
              editor.isActive("italic") && "text-[#2eaadc] bg-[#2eaadc]/15"
            )}
            title="Italic"
          >
            <Italic size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={clsx(
              "p-1 rounded text-[#8c8c8c] hover:text-white hover:bg-[#2c2c2c] transition-all cursor-pointer",
              editor.isActive("strike") && "text-[#2eaadc] bg-[#2eaadc]/15"
            )}
            title="Strikethrough"
          >
            <Strikethrough size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={clsx(
              "p-1 rounded text-[#8c8c8c] hover:text-white hover:bg-[#2c2c2c] transition-all cursor-pointer",
              editor.isActive("underline") && "text-[#2eaadc] bg-[#2eaadc]/15"
            )}
            title="Underline"
          >
            <UnderlineIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={clsx(
              "p-1 rounded text-[#8c8c8c] hover:text-white hover:bg-[#2c2c2c] transition-all cursor-pointer",
              editor.isActive("code") && "text-[#2eaadc] bg-[#2eaadc]/15"
            )}
            title="Code"
          >
            <Code size={14} />
          </button>
          
          <div className="w-[1px] h-4 bg-[#2d2d2d] mx-0.5" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={clsx(
              "p-1 rounded text-[#8c8c8c] hover:text-white hover:bg-[#2c2c2c] transition-all cursor-pointer",
              editor.isActive({ textAlign: "left" }) && "text-[#2eaadc]"
            )}
            title="Align Left"
          >
            <AlignLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={clsx(
              "p-1 rounded text-[#8c8c8c] hover:text-white hover:bg-[#2c2c2c] transition-all cursor-pointer",
              editor.isActive({ textAlign: "center" }) && "text-[#2eaadc]"
            )}
            title="Align Center"
          >
            <AlignCenter size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={clsx(
              "p-1 rounded text-[#8c8c8c] hover:text-white hover:bg-[#2c2c2c] transition-all cursor-pointer",
              editor.isActive({ textAlign: "right" }) && "text-[#2eaadc]"
            )}
            title="Align Right"
          >
            <AlignRight size={14} />
          </button>

          <div className="w-[1px] h-4 bg-[#2d2d2d] mx-0.5" />

          {/* Color selectors */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-1 rounded text-[#8c8c8c] hover:text-white hover:bg-[#2c2c2c] transition-all cursor-pointer"
              title="Colors"
            >
              <Palette size={14} />
            </button>
            {showColorPicker && (
              <div className="absolute top-7 left-0 bg-[#202020] border border-[#2d2d2d] rounded-md shadow-2xl p-2.5 z-50 flex flex-col gap-1 w-36 animate-in fade-in slide-in-from-bottom-2 duration-150">
                <span className="text-[9px] text-[#555] uppercase font-semibold px-1 mb-1 tracking-wider">Text Color</span>
                <div className="grid grid-cols-6 gap-1 mb-2">
                  {colors.map((c) => (
                    <button
                      key={c.val}
                      type="button"
                      onClick={() => applyTextColor(c.val)}
                      className="size-5 rounded-full border border-transparent hover:border-white transition-all cursor-pointer"
                      style={{ backgroundColor: c.val }}
                      title={c.label}
                    />
                  ))}
                </div>
                
                <div className="h-[1px] bg-[#2d2d2d] my-1" />
                
                <span className="text-[9px] text-[#555] uppercase font-semibold px-1 mb-1 tracking-wider">Background</span>
                <div className="grid grid-cols-5 gap-1 mb-2">
                  {bgColors.map((c) => (
                    <button
                      key={c.val}
                      type="button"
                      onClick={() => applyHighlight(c.val)}
                      className="size-5 rounded border border-[#3c3c3c] hover:border-white transition-all cursor-pointer"
                      style={{ backgroundColor: c.val.replace("2a", "") }}
                      title={c.label}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().unsetColor().run();
                    editor.chain().focus().unsetHighlight().run();
                    setShowColorPicker(false);
                  }}
                  className="text-[10px] text-red-400 hover:text-red-300 hover:bg-[#2c2c2c] rounded px-1.5 py-0.5 text-center mt-1 w-full cursor-pointer"
                >
                  Reset Colors
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              const currentHref = editor.getAttributes("link").href || "";
              openModal({
                title: "Insert Link",
                submitLabel: "Set Link",
                fields: [
                  { key: "url", label: "Link URL", placeholder: "https://...", type: "url", defaultValue: currentHref }
                ],
                onSubmit: (values) => {
                  const { url } = values;
                  if (url) {
                    editor.chain().focus().setLink({ href: url }).run();
                  } else {
                    editor.chain().focus().unsetLink().run();
                  }
                }
              });
            }}
            className={clsx(
              "p-1 rounded text-[#8c8c8c] hover:text-white hover:bg-[#2c2c2c] transition-all cursor-pointer",
              editor.isActive("link") && "text-[#2eaadc] bg-[#2eaadc]/15"
            )}
            title="Link"
          >
            <LinkIcon size={14} />
          </button>

          <button
            type="button"
            onClick={() => {
              editor.chain().focus().unsetAllMarks().run();
              editor.chain().focus().clearNodes().run();
            }}
            className="p-1 rounded text-[#8c8c8c] hover:text-white hover:bg-[#2c2c2c] transition-all cursor-pointer"
            title="Clear Formatting"
          >
            <Minus size={14} />
          </button>
        </div>
      )}

      {/* Floating Searchable Slash Commands Popover List */}
      {notionMode && slashMenuOpen && (
        <div
          ref={slashMenuRef}
          className="absolute z-[100] max-h-64 w-64 overflow-y-auto rounded-lg border border-[#2d2d2d] bg-[#202020] py-1.5 shadow-2xl outline-none select-none scrollbar-thin scrollbar-thumb-[#2c2c2c]"
          style={{
            top: `${slashCoords.top + 24}px`,
            left: `${slashCoords.left}px`,
          }}
        >
          <div className="px-3 py-1.5">
            <input
              type="text"
              placeholder="Search command..."
              value={slashSearch}
              onChange={(e) => setSlashSearch(e.target.value)}
              className="w-full bg-[#191919] border border-[#2d2d2d] rounded px-2 py-1 text-xs text-white outline-none placeholder-[#555] focus:border-[#2eaadc]"
              autoFocus
            />
          </div>
          <div className="px-3 py-1 text-[9px] uppercase tracking-wider text-[#555] font-semibold border-t border-[#2d2d2d] pt-2">
            Blocks & Commands
          </div>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <button
                key={idx}
                data-active={idx === selectedCommandIndex}
                onClick={() => executeSlashCommand(cmd)}
                className={clsx(
                  "flex w-full items-center gap-3 px-3 py-2 text-left transition-all cursor-pointer",
                  idx === selectedCommandIndex
                    ? "bg-[#2c2c2c] text-white"
                    : "text-[#8c8c8c] hover:bg-[#252525] hover:text-white"
                )}
                type="button"
              >
                <div className="flex size-7 items-center justify-center rounded bg-[#2b2b2b] border border-[#3c3c3c]">
                  {cmd.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium">{cmd.label}</span>
                  <span className="text-[10px] opacity-60 leading-tight">{cmd.description}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-3 py-4 text-xs text-[#555] text-center">
              No matching commands
            </div>
          )}
        </div>
      )}

      <EditorContent editor={editor} />

      {/* Premium Input Dialog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="bg-[#1f1f1f] border border-[#2d2d2d] rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-md font-bold text-white mb-4 tracking-tight">{modalTitle}</h3>
            
            <div className="space-y-4 mb-6">
              {modalFields.map((f) => (
                <div key={f.key} className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#8c8c8c] font-medium tracking-wide">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={modalValues[f.key] || ""}
                    onChange={(e) => {
                      setModalValues((prev) => ({ ...prev, [f.key]: e.target.value }));
                    }}
                    className="w-full bg-[#151515] border border-[#2d2d2d] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#2eaadc] transition-all"
                    autoFocus={f.key === modalFields[0].key}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        modalOnSubmit(modalValues);
                        setModalOpen(false);
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="bg-[#252525] border border-[#2d2d2d] hover:bg-[#2c2c2c] text-[#c0c0c0] hover:text-white px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  modalOnSubmit(modalValues);
                  setModalOpen(false);
                }}
                className="bg-[#2eaadc] hover:bg-[#1a93c4] text-white px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-all"
              >
                {modalSubmitLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichEditor;
