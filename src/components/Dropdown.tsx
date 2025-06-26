import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, Check } from "lucide-react"
import type { DropdownPropsWithIcon, OptionWithIcon } from "../types/types"

const Dropdown = ({ value, onChange, options, placeholder, className = "", fullWidth = false, searchable = false, dropdownWidth }: DropdownPropsWithIcon) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const selectedOption = options.find(option => 'value' in option && option.value === value) as OptionWithIcon | undefined

  const filteredOptions = options.filter(option => {
    if (!searchable || !searchTerm) return true
    if ('isTitle' in option) return true
    return option.label.toLowerCase().includes(searchTerm.toLowerCase())
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSearchTerm("");
    }
  }

  return (
    <div className={`relative ${fullWidth ? 'block w-full' : 'inline-block'}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className={`flex items-center justify-between border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-0 bg-white w-full ${className}`}
      >
        <span className="flex items-center ">
          {selectedOption?.icon ? (
            <span className="w-4 h-4 flex items-center justify-center mr-2">{selectedOption.icon}</span>
          ) : (selectedOption && 'image' in selectedOption && selectedOption.image) ? (
            <img src={selectedOption.image} alt={selectedOption.label} className="w-4 h-4 mr-2" />
          ) : null}
          <span>{selectedOption?.label || placeholder || "Select..."}</span>
        </span>
        <ChevronDown className="w-4 h-4 ms-2 text-gray-400" />
      </button>

      {isOpen && (
        <div className={`absolute p-1 z-10 ${dropdownWidth || 'w-full'} mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto`}>
          {searchable && (
            <div className="relative p-2">
              <Search className="absolute w-4 h-4 text-gray-400 top-1/2 -translate-y-1/2 left-5" />
              <input
                type="text"
                placeholder="Search Models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-200 rounded-md pl-10 pr-4 py-1.5 text-sm"
              />
            </div>
          )}
          {filteredOptions.map((option) => {
            if ('isTitle'in option && option.isTitle) {
              return <div key={option.label} className="px-3 py-2 text-xs text-gray-500 uppercase font-semibold">{option.label}</div>
            }
            
            const regularOption = option as OptionWithIcon
            const isSelected = regularOption.value === value

            return (
              <div
                key={regularOption.value}
                className={`py-2 px-3 text-sm cursor-pointer rounded-md hover:bg-gray-100 whitespace-nowrap flex items-center justify-between gap-2 ${isSelected && 'bg-gray-200' }`}
                onClick={() => {
                  onChange(regularOption.value)
                  setIsOpen(false)
                  setSearchTerm("")
                }}
              >
                <span className="flex items-center gap-2">
                  {regularOption.icon ? (
                    <span className="w-4 h-4 flex items-center justify-center">{regularOption.icon}</span>
                  ) : ('image' in regularOption && regularOption.image) ? (
                    <img src={regularOption.image} alt={regularOption.label} className="w-4 h-4" />
                  ) : null}
                  {regularOption.label}
                </span>
                {isSelected && <Check className="w-4 h-4 text-black" />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown 