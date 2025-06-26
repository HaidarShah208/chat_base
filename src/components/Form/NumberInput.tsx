import type { ChangeEvent } from "react"
import type { NumberInputProps } from "../../types/types"


const NumberInput = ({ value, onChange, width = "w-20", className = "" }: NumberInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value))
  }

  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      className={`${width} border border-gray-300 text-center rounded-md px-1 py-1 text-gray-900 focus:outline-none focus:ring-0 ${className}`}
    />
  )
}

export default NumberInput 