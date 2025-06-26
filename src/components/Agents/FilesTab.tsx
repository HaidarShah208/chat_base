import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Upload } from "lucide-react"
import type { FileItem, FilesTabProps, SourceItem, UploadingFile } from "../../types/types"
import { allowedTypes } from "../../constants/Data"
import SourcesManager from "../SourcesManager"
import FileUploading from "../FileUploading"
import formatFileSize from "../../constants/FileSize"

const FilesTab: React.FC<FilesTabProps> = ({ onFilesChange }) => {
  const [files, setFiles] = useState<FileItem[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files)
    }
  }, [files, onFilesChange])

  const simulateFileUpload = (file: File) => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setUploadingFiles(prev => 
          prev.map(f => f.name === file.name ? { ...f, progress } : f)
        );
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadingFiles(prev => prev.filter(f => f.name !== file.name));
            resolve();
          }, 500);
        }
      }, 400);
    });
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return
    const validFiles = Array.from(fileList).filter((file) => allowedTypes.includes(file.type))

    setUploadingFiles(prev => [
      ...prev,
      ...validFiles.map(file => ({ name: file.name, progress: 0 }))
    ]);

    await Promise.all(validFiles.map(file => simulateFileUpload(file)));

    const newFileItems: FileItem[] = validFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      isNew: false,
    }))

    setFiles((prev) => [...prev, ...newFileItems])
  }

  const handleSelectItem = (id: string) => {
    setSelectedFiles((prev) => (prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id]))
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(filteredFiles.map((item) => item.id))
    } else {
      setSelectedFiles([])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    e.target.value = ""
  }

 

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    switch (extension) {
      case "txt":
        return (
          <div className="w-8 h-6 bg-purple-500 rounded text-white text-xs font-medium flex items-center justify-center">
            TXT
          </div>
        )
      case "pdf":
        return (
          <div className="w-8 h-6 bg-red-500 rounded text-white text-xs font-medium flex items-center justify-center">
            PDF
          </div>
        )
      case "doc":
      case "docx":
        return (
          <div className="w-8 h-6 bg-blue-500 rounded text-white text-xs font-medium flex items-center justify-center">
            DOC
          </div>
        )
      default:
        return (
          <div className="w-8 h-6 bg-gray-500 rounded text-white text-xs font-medium flex items-center justify-center">
            FILE
          </div>
        )
    }
  }

  const filteredFiles = files.filter((fileItem) => fileItem.file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const sourceItems: SourceItem[] = filteredFiles.map((fileItem) => ({
    id: fileItem.id,
    name: fileItem.file.name,
    size: fileItem.file.size,
    isNew: fileItem.isNew,
  }))

  const handleDeleteItems = (ids: string[]) => {
    setFiles(prevFiles => prevFiles.filter(file => !ids.includes(file.id)));
    setSelectedFiles(prev => prev.filter(id => !ids.includes(id)));
  }

  const handleRestore = () => {
    console.log("Restored files:", selectedFiles)
  }

  const getItemIcon = (item: SourceItem) => getFileIcon(item.name)

  const formatItemDetails = (item: SourceItem) => formatFileSize(item.size)

  return (
    <>
      <div className="bg-white rounded-xl border p-4 sm:p-8 shadow-sm w-full">
        <h2 className="text-xl font-semibold mb-2">Files</h2>
        <p className="text-gray-500 mb-4 text-sm">
          The Files tab allows you to upload and manage va8ous8ocument types to train your AI agent.{" "}
          <a href="#" className="underline ">
            Learn more
          </a>
        </p>

        <div
          className={`border-2 bg-gray-50 border-dashed rounded-lg flex flex-col items-center justify-center py-8 sm:py-12 mb-4 text-center transition-colors cursor-pointer ${
            dragActive ? " bg-blue-50" : "border-gray-200"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={handleInputChange}
          />
          <div className="text-3xl mb-2 text-gray-400"><Upload className="w-8 h-8" /></div>
          <div className="mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Drag & drop files here, or click to select files
          </div>
          <div className="text-xs text-gray-500 mb-2">Supported File Types: .pdf, .doc, .docx, .txt</div>
        </div>

        <div className="text-sm text-gray-600 text-center mb-6">
          If you are uploading a PDF, make sure you can select/highlight the text.
        </div>
      </div>

      {files.length > 0 && (
        <SourcesManager
          items={sourceItems}
          title="File sources"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedItems={selectedFiles}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          onDeleteItems={handleDeleteItems}
          onRestore={handleRestore}
          getItemIcon={getItemIcon}
          formatItemDetails={formatItemDetails}
          showRestore={true}
          emptySearchMessage="No Result found"
        />
      )}

      <FileUploading 
        files={uploadingFiles}
        onRemove={(fileName) => setUploadingFiles(prev => prev.filter(f => f.name !== fileName))}
      />
    </>
  )
}

export default FilesTab
