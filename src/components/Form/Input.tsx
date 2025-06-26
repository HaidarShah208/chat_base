import type { InputProps } from "../../types/types"


const Input = ({ 
  value, 
  onChange, 
  placeholder, 
  type = "text",
  className = "",
  onReset,
  showReset = false,
  isHalfWidth = false,
  name
}: InputProps) => {
  return (
    <div className={`flex gap-2 items-center ${isHalfWidth ? 'w-full md:w-1/2' : 'w-full'}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border text-sm border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-none focus:ring-0 ${className}`}
      />
      {showReset && (
        <button
          onClick={onReset}
          className="px-3 py-2 bg-gray-100 text-sm text-gray-600 hover:text-gray-800 rounded-md"
        >
          Reset
        </button>
      )}
    </div>
  )
}

export default Input 