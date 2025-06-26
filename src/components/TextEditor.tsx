import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import type { TextEditorProps } from "../types/types";
import { formats, modules } from "../constants/Data";

const TextEditor = ({
  titleLabel = "Title",
  titlePlaceholder = "Ex: Refund requests",
  editorLabel = "Text",
  editorPlaceholder = "Enter your text",
  showTitle = true,
  title,
  onTitleChange,
  editorValue,
  onEditorChange,
  name,
  titleError,
}: TextEditorProps) => {
  return (
    <div className="space-y-4">
      {showTitle && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{titleLabel}</label>
          <input
            type="text"
            placeholder={titlePlaceholder}
            value={title}
            onChange={onTitleChange}
            name={name}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-0"
          />
          {titleError && <div className="text-red-500 text-sm mt-1">{titleError}</div>}
        </div>
      )}
      
      <div>
        <label className="block text-md mt-7 font-medium text-gray-700 mb-2">{editorLabel}</label>
        <div className="  rounded-md">
          <ReactQuill
            theme="snow"
            value={editorValue}
            onChange={onEditorChange}
            modules={modules}
            formats={formats}
            placeholder={editorPlaceholder}
            className="h-48 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default TextEditor; 