
import { useState } from "react"

function MessageColor() {
  const [userMessageColor, setUserMessageColor] = useState("#3B82F6")
  const [chatBubbleColor, setChatBubbleColor] = useState("#000000")
  const [syncColors, setSyncColors] = useState(false)

  const handleResetUserColor = () => {
    setUserMessageColor("#3b82f6")
  }

  const handleResetChatBubbleColor = () => {
    setChatBubbleColor("#000000")
  }

  const handleUserColorChange = (color: string) => {
    setUserMessageColor(color)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold mb-3 text-gray-900">User message color</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="color"
              value={userMessageColor}
              onChange={(e) => handleUserColorChange(e.target.value)}
              className="opacity-0 absolute inset-0 w-8 h-8 cursor-pointer"
            />
            <div
              className="w-8 h-8 rounded-full border-4 border-gray-300 cursor-pointer"
              style={{ backgroundColor: userMessageColor }}
            />
          </div>
          <button
            onClick={handleResetUserColor}
            className="text-sm bg-gray-100 font-medium px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="sync-colors"
          checked={syncColors}
          onChange={(e) => setSyncColors(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="sync-colors" className="text-sm text-gray-700 cursor-pointer">
          Sync user message color with agent header
        </label>
      </div>

      <div>
        <h3 className="text-base font-semibold mb-3 text-gray-900">Chat bubble button color</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="color"
              value={chatBubbleColor}
              onChange={(e) => setChatBubbleColor(e.target.value)}
              className="opacity-0 absolute inset-0 w-8 h-8 cursor-pointer"
            />
            <div
              className="w-8 h-8 rounded-full border-4 border-gray-300 cursor-pointer"
              style={{ backgroundColor: chatBubbleColor }}
            />
          </div>
          <button
            onClick={handleResetChatBubbleColor}
            className="text-sm bg-gray-100 font-medium px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageColor
