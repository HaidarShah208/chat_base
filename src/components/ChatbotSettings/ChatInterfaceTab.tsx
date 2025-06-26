import { useState, useRef } from "react"
import Input from "../Form/Input"
import ChatBot from "../ChatBot/ChatBot"
import { InfoIcon, PlusIcon, UploadIcon } from "lucide-react"
import RichTextFooter from "../RichTextFooter"
import Dropdown from "../Dropdown"
import { directionOptions, themeOptions } from "../../constants/DropdownOptions"
import NumberInput from "../Form/NumberInput"
import SaveButton from "../Form/SaveButton"
import type { ChatInterfaceTabProps } from '../../types/types'
import MessageColor from "./MessageColor"


const ChatInterfaceTab = ({ }: ChatInterfaceTabProps) => {
    const [initialMessages, setInitialMessages] = useState("Hi! What can I help you with?")
    const [suggestedMessages, setSuggestedMessages] = useState<string[]>([])
    const [keepShowingSuggestions, setKeepShowingSuggestions] = useState(false)
    const [messagePlaceholder, setMessagePlaceholder] = useState("Message...")
    const [collectFeedback, setCollectFeedback] = useState(true)
    const [regenerateMessages, setRegenerateMessages] = useState(true)
    const [theme, setTheme] = useState("light")
    const [displayName, setDisplayName] = useState("")
    const [profilePicture, setProfilePicture] = useState<string | null>(null)
    const [chatIcon, setChatIcon] = useState<string | null>(null)

    const [direction, setDirection] = useState("left")

    const profilePicInputRef = useRef<HTMLInputElement>(null)
    const chatIconInputRef = useRef<HTMLInputElement>(null)

    const handleUploadClick = (ref: React.RefObject<HTMLInputElement>) => {
        ref.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string | null) => void) => {
        const file = e.target.files?.[0]
        if (!file) return

        const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"]
        if (!allowedTypes.includes(file.type)) {
            alert("Invalid file type. Please select a JPG, PNG, or SVG file.")
            return
        }

        const maxSizeInBytes = 1 * 1024 * 1024 
        if (file.size > maxSizeInBytes) {
            alert("File size exceeds 1MB limit.")
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            setter(reader.result as string)
        }
        reader.readAsDataURL(file)
        e.target.value = ""
    }

    const handleAddSuggestedMessage = () => {
        setSuggestedMessages([...suggestedMessages, ""])
    }

    const handleUpdateSuggestedMessage = (index: number, value: string) => {
        const newMessages = [...suggestedMessages]
        newMessages[index] = value
        setSuggestedMessages(newMessages)
    }

    const handleReset = () => {
        setInitialMessages("Hi! What can I help you with?")
    }



    return (
        <div className="bg-white mb-10 pb-2 pe-2 border rounded-lg shadow-sm">
            <input
                type="file"
                ref={profilePicInputRef}
                onChange={(e) => handleFileChange(e, setProfilePicture)}
                className="hidden"
                accept="image/jpeg,image/png,image/svg+xml"
            />
            <input
                type="file"
                ref={chatIconInputRef}
                onChange={(e) => handleFileChange(e, setChatIcon)}
                className="hidden"
                accept="image/jpeg,image/png,image/svg+xml"
            />
            <div className="flex  lg:flex-row flex-col">
                <div className="flex-1 max-w-xl  p-6 ">
                    <h3 className="text-2xl mb-10 font-semibold ">Chat interface</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex  items-center justify-between mb-2">
                                <h3 className="text-base font-semibold">Initial messages</h3>
                                <button
                                    onClick={handleReset}
                                    className="text-sm bg-gray-100 font-medium  px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Reset
                                </button>
                            </div>
                            <textarea
                                value={initialMessages}
                                onChange={(e) => setInitialMessages(e.target.value)}
                                className="w-full text-sm h-24 p-3 border rounded-lg"
                                placeholder="Enter each message in a new line."
                            />
                            <p className="text-gray-500 text-sm mt-1">Enter each message in a new line.</p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-base font-semibold">Suggested messages</h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <InfoIcon className="w-4 h-4 text-gray-800" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {suggestedMessages.map((message, index) => (
                                    <Input
                                        key={index}
                                        value={message}
                                        onChange={(e: any) => handleUpdateSuggestedMessage(index, e.target.value)}
                                        placeholder="Suggested message..."
                                    />
                                ))}
                            </div>
                            <button
                                onClick={handleAddSuggestedMessage}
                                className="mt-2 border border-gray-200 rounded-md p-1.5 shadow-sm font-medium text-sm text-gray-900 hover:text-gray-800 flex items-center gap-1"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Add suggested message
                            </button>
                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center gap-1">
                                <span className="text-gray-600 text-base font-medium">Keep showing the suggested messages after the user's first message</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={keepShowingSuggestions}
                                    onChange={(e) => setKeepShowingSuggestions(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>

                        <div>
                            <h3 className="text-base font-semibold mb-2">Message placeholder</h3>
                            <Input
                                value={messagePlaceholder}
                                onChange={(e: any) => setMessagePlaceholder(e.target.value)}
                                placeholder="Message..."
                            />
                        </div>

                        <div className="space-y-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900 text-base font-medium">Collect user feedback</span>
                                    <InfoIcon className="w-4 h-4 text-gray-800" />
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={collectFeedback}
                                        onChange={(e) => setCollectFeedback(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                </label>
                            </div>

                            <div className="flex items-center mt-5 justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900 text-base font-medium">Regenerate messages</span>
                                    <InfoIcon className="w-4 h-4 text-gray-800" />
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={regenerateMessages}
                                        onChange={(e) => setRegenerateMessages(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                </label>
                            </div>
                        </div>

                        <RichTextFooter />

                        <div className="mt-6">
                            <h3 className="text-base font-semibold mb-2">Theme</h3>
                            <Dropdown
                                value={theme}
                                onChange={setTheme}
                                options={themeOptions}
                                className="w-32"
                            />
                        </div>

                        <div className="my-6">
                            <h3 className="text-base font-semibold mb-2">Display name</h3>
                            <Input
                                value={displayName}
                                onChange={(e: any) => setDisplayName(e.target.value)}
                                placeholder="Enter display name"
                                className="w-full"
                            />
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#E4E4E7] border border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                    {profilePicture ? (
                                        <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                    ) : null}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-gray-600 text-sm font-medium mb-2">Profile picture</h3>

                                    <button
                                        onClick={() => handleUploadClick(profilePicInputRef)}
                                        className="flex w-fit items-center gap-2 border rounded-lg px-4 py-2 text-sm font-medium"
                                    >
                                        <UploadIcon className="w-4 h-4" />
                                        Upload image
                                    </button>
                                    <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, and SVG files up to 1MB</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#E4E4E7] border border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                    {chatIcon ? (
                                        <img src={chatIcon} alt="Chat Icon" className="w-full h-full object-cover" />
                                    ) : null}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-gray-600 text-sm font-medium mb-2">Chat icon</h3>

                                    <button
                                        onClick={() => handleUploadClick(chatIconInputRef)}
                                        className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm font-medium w-fit"
                                    >
                                        <UploadIcon className="w-4 h-4" />
                                        Upload image
                                    </button>
                                    <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, and SVG files up to 1MB</p>
                                </div>
                            </div>
                        </div>
                        <MessageColor />

                        <div className="mt-6">
                            <h3 className="text-base text-[#3F4B58] font-semibold mb-2">Align Chat bubble button</h3>
                            <Dropdown
                                value={direction}
                                onChange={setDirection}
                                options={directionOptions}
                                    className="w-32"
                            />
                        </div>
                        <div className="mt-16">
                            <h3 className="text-base text-[#3F4B58] font-semibold mb-2">Auto shown initial messages pop-ups after</h3>
                            <NumberInput
                                value={10}
                                onChange={() => { }}
                                width="w-full text-start px-2"
                            />
                            <h3 className="text-base text-[#3F4B58] mb-2"> <span className="font-semibold text-black">seconds</span> (negative to disable)</h3>

                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="sticky mt-14 top-4">
                        <ChatBot />
                    </div>
                </div>
            </div>
            <SaveButton />
        </div>
    )
}

export default ChatInterfaceTab 