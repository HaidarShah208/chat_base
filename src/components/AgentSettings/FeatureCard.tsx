import React from "react"
import type { FeatureCardProps } from "../../types/types"


const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  price,
  description,
  toggleLabel = "Disabled",
  enabled,
  onToggle,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm mb-4 bg-white">
        <div className="">
        <h3 className="text-2xl border-b border-gray-200 py-4 px-6 font-semibold mb-2">{title}</h3>

        </div>
      <div className="px-6 py-3 pb-2">
    <div className="mb-6">
    <div className="text-lg font-bold mb-1">{price}</div>
    <div className="text-gray-600 text-base mb-4">{description}</div>
    </div>
    <div className="flex items-center gap-2 mt-2">

    </div>
        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none border border-gray-300 ${enabled ? 'bg-green-500' : 'bg-gray-200'}`}
            aria-pressed={enabled}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
          <span className="text-gray-500 text-sm">{toggleLabel}</span>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard 