import type { TabContentPanelProps } from "../../types/types"

const TabContentPanel = ({
  title,
  description,
  children,
  showActionButton = false,
  actionButtonText = "Make Public",
  onActionClick,
  className = ""
}: TabContentPanelProps) => {
  return (
    <div className={`bg-white rounded-xl border px-8 py-5 shadow-sm ${className}`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {description && (
        <p className="text-gray-600">{description}</p>
      )}
      {children}
      {showActionButton && (
        <div className="flex justify-end mt-6">
          <button 
            onClick={onActionClick}
            className="bg-black text-white font-semibold py-1.5 px-4 rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            {actionButtonText}
          </button>
        </div>
      )}
    </div>
  )
}

export default TabContentPanel 