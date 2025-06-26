import React, { useState } from "react"
import { MoreHorizontal, ChevronRight, Trash2 } from "lucide-react"
import type { SourcesListProps } from "../types/types"

const SourcesList: React.FC<SourcesListProps> = ({
  items,
  getFileIcon,
  formatFileSize,
  selectedItems,
  onSelectItem,
  onDeleteItems,
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    onDeleteItems([id]);
    setOpenMenuId(null);
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => onSelectItem(item.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            {getFileIcon(item.name)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900 truncate">{item.name}</span>
                {item.isNew && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    New
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">{formatFileSize(item.size)}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 relative">
            <button 
              onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
            {openMenuId === item.id && (
              <div className="absolute -left-14 top-7 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SourcesList 