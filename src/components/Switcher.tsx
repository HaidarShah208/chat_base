import { useState, useRef, useEffect } from "react"
import { Search, Check, PlusCircle } from "lucide-react"
import ChevronsUpDownIcon from "../../public/icons/svg/ChevronsUpDownIcon"

interface SwitcherProps {
  items: { name: string }[];
  initialSelectedItem: string;
  searchPlaceholder: string;
  listTitle: string;
  createText: string;
}

const Switcher = ({ items, initialSelectedItem, searchPlaceholder, listTitle, createText }: SwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem)
  const switcherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentItem = items.find(item => item.name === selectedItem);

  return (
    <div ref={switcherRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium"
      >
        <span className="font-medium text-sm  truncate max-w-[160px]">{currentItem?.name || "Select..."}</span>
        <ChevronsUpDownIcon className="h-6 w-6 hover:bg-gray-200 rounded-md p-1 shrink-0 opacity-50" />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-56 bg-white border rounded-lg shadow-lg z-10 p-2">
          <div className="relative mb-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full pl-8 pr-2 py-1  border-b border-gray-200 focus:ring-0 focus:outline-none text-sm"
            />
          </div>
          <div className="text-xs font-semibold text-gray-500 px-2 mb-1">{listTitle}</div>
          {items.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                setSelectedItem(item.name)
                setIsOpen(false)
              }}
              className={`flex items-center justify-between p-1.5 rounded-md hover:bg-gray-100 cursor-pointer text-sm ${selectedItem && 'bg-gray-200'}`}
            >
              <span className="font-semibold">{item.name}</span>
              {selectedItem === item.name && <Check className="h-4 w-4 text-gray-600" />}
            </div>
          ))}
          <div className="border-t my-2"></div>
          <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm w-full">
            <PlusCircle className="h-4 w-4" />
            <span>{createText}</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Switcher 