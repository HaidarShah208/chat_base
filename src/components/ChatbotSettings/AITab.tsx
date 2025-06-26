import { InfoIcon } from "lucide-react"
import { instructionOptions, modelOptions } from "../../constants/DropdownOptions"
import type { AITabProps, OptionWithIcon } from "../../types/types"
import SaveButton from "../Form/SaveButton"
import Dropdown from "../Dropdown"


const AITab = ({
  selectedModel,
  setSelectedModel,
  instructionType,
  setInstructionType,
  instructions,
  setInstructions,
  temperature,
  setTemperature,
}: AITabProps) => {

  return (
    <>
      <div className="bg-white rounded-xl border p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">AI</h2>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <label className="text-sm font-medium text-gray-700">Model</label>
            <span className="text-xs font-medium bg-transparent border border-gray-300 px-2 py-1 rounded-xl">
              Claude 4 models are now available
            </span>
          </div>
          <Dropdown
            value={selectedModel}
            onChange={setSelectedModel}
            options={modelOptions}
            placeholder="Select a model"
            searchable={true}
            fullWidth={true}
            dropdownWidth="w-56"
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Instructions</label>
            <div className="flex items-center gap-2">
              <Dropdown
                value={instructionType}
                onChange={setInstructionType} 
                options={instructionOptions as OptionWithIcon[]}
                placeholder="Select a prompt"
                dropdownWidth="w-52"
              />
              <button className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 border border-gray-300 rounded-md">
                Reset
              </button>
            </div>
          </div>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full h-80 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-0 font-medium"
            placeholder="Enter your instructions here..."
          />
          <p className="text-sm mt-2">The instructions allow you to customize your agent's personality and style. Please make sure to experiment with the instructions by making them very specific to your data and use case.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Temperature</label>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-900">{temperature}</span>
              <InfoIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(Number.parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs mt-1">
              <span>Reserved</span>
              <span>Creative</span>
            </div>
          </div>
        </div>

      <SaveButton />
      </div>

      <div className="bg-white rounded-xl border px-6 py-5 mb-10 shadow-sm mt-6">
        <h2 className="text-xl font-semibold mb-6">Training</h2>
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">Last trained at</h3>
          <p className="text-gray-900 text-sm font-medium pt-2">June 18, 2025 at 11:45 PM</p>
        </div>
      </div>
    </>
  )
}

export default AITab 