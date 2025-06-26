
import type React from "react"
import { X, ChevronUp } from "lucide-react"
import type { FileUploadingProps } from "../types/types"

const FileUploading: React.FC<FileUploadingProps> = ({ files, onRemove }) => {
  if (files.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 rounded-md overflow-hidden text-white shadow-lg z-50 w-80">
      <div className="p-3 flex items-center bg-black justify-between border-b border-gray-800">
        <div className="flex items-center gap-2">
          <ChevronUp className="w-4 h-4" />
          <span className="font-medium text-sm">Uploading {files.length}/1 files</span>
        </div>
      </div>
      {files.map((file) => (
        <div key={file.name} className="p-3 flex items-center gap-3">
          <div className="relative">
            <svg className="w-10 h-10">
              <circle
                className="text-gray-400"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="16"
                cx="20"
                cy="20"
              />
              <circle
                className="text-black"
                strokeWidth="4"
                strokeDasharray={100}
                strokeDashoffset={100 - file.progress}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="16"
                cx="20"
                cy="20"
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                }}
              />
            </svg>
            <span className="absolute text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
              {file.progress}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-black font-medium truncate">{file.name}</span>
              <button onClick={() => onRemove(file.name)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-gray-400">Processing...</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FileUploading
 