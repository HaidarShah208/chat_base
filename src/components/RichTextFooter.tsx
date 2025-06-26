
import { useState, useRef, useCallback } from "react"
import { formatButtons } from "../constants/Data"

export default function RichTextFooter() {
  const [, setFooterText] = useState("")
  const [charCount, setCharCount] = useState(0)
  const editorRef = useRef<HTMLDivElement>(null)
  const maxLength = 200

  const executeCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    updateCharCount()
  }, [])

  const updateCharCount = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || ""
      setCharCount(text.length)
      setFooterText(text)
    }
  }, [])

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || ""
      if (text.length > maxLength) {
        const truncated = text.substring(0, maxLength)
        editorRef.current.innerText = truncated
        const range = document.createRange()
        const selection = window.getSelection()
        range.selectNodeContents(editorRef.current)
        range.collapse(false)
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
      updateCharCount()
    }
  }, [maxLength, updateCharCount])





  return (
    <div className="max-w-2xl mx-auto ">
      <div>
        <h3 className="text-base font-semibold mb-2">Footer</h3>
        <div className=" ">
          <div className="flex justify-around items-center gap-1 p-2">
            {formatButtons.map((button, index) => {
              const IconComponent = button.icon
              return (
                <button
                  key={index}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                  title={`${button.title}${button.shortcut ? ` (${button.shortcut})` : ""}`}
                  onClick={() => {
                    executeCommand(button.command)
                  }}
                  type="button"
                >
                  <IconComponent className="w-4 h-4" />
                </button>
              )
            })}
          </div>
          <div className="p-2">
            <div
              ref={editorRef}
              contentEditable
              className="w-full min-h-16 border resize-none rounded-md outline-none focus:ring-1 focus:ring-black  text-sm p-2"
              onInput={handleInput}
              onPaste={(e) => {
                e.preventDefault()
                const paste = e.clipboardData?.getData("text/plain") || ""
                const currentText = editorRef.current?.innerText || ""
                const remainingChars = maxLength - currentText.length
                const textToInsert = paste.substring(0, remainingChars)
                document.execCommand("insertText", false, textToInsert)
              }}
              style={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
              suppressContentEditableWarning={true}
            />
         
          <div className="flex justify-end w-full">
          <div className={`text-xs  mt-1 ${charCount > maxLength * 0.9 ? "text-red-500" : "text-gray-900"}`}>
              {charCount}/{maxLength} characters
            </div>
          </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-2">
          You can use this to add a disclaimer or a link to your privacy policy.
        </p>
      </div>

     
    </div>
  )
}
