import { RefreshCw, Send } from "lucide-react"
import { useState } from "react"
import type { Message } from "../../types/types"
import { webName } from "../../constants/WebsiteCredientials"

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
          id: 1,
          text: "Hi! What can I help you with?",
          isUser: false,
        },
      ])
      const [inputValue, setInputValue] = useState("")
    
      const handleSendMessage = () => {
        if (inputValue.trim()) {
          const newMessage: Message = {
            id: messages.length + 1,
            text: inputValue,
            isUser: true,
          }
          setMessages([...messages, newMessage])
          setInputValue("")
        }
      }
    
      const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          handleSendMessage()
        }
      }
    return (
    <div className="  rounded-md   flex justify-center items-center p-8">
            <div className="bg-white border rounded-xl shadow-lg w-full max-w-md h-[350px] flex flex-col overflow-hidden">
              <div className="px-4 py-6 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
                <h2 className="text-sm font-medium text-gray-900">8613 Topic approval request.docx + other files</h2>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <RefreshCw className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`rounded-2xl  px-4 py-2.5 max-w-[250px] text-sm ${
                          message.isUser ? "bg-black rounded-br-none text-white" : "bg-gray-100 rounded-bl-none text-gray-700"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 outline-none text-gray-700 placeholder-gray-400 py-2 px-1 text-sm"
                    />
                    <button onClick={handleSendMessage} className="p-1">
                      <Send className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center py-3 bg-[#FAFAFA] flex-shrink-0">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  <span className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center text-[10px]">🤖</span>
                  Powered By {webName}
                </p>
              </div>

              {/* <div className="px-4 py-2 border-t border-gray-100 flex-shrink-0">
                <button className="w-full text-sm text-gray-600 hover:text-gray-800">Show sources</button>
              </div> */}
            </div>
          </div>
  )
}

export default ChatBot
