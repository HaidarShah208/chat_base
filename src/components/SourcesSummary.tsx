import React from "react"
import type { SourcesSummaryProps } from "../types/types"


const SourcesSummary: React.FC<SourcesSummaryProps> = ({ count, totalSize, maxSize, formatFileSize }) => {
  return (
    <div>
      {count > 0 && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center mt-2 text-xs text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {count} File{count !== 1 ? "s" : ""}
          </div>
          <div className="text-sm font-medium text-gray-900">{formatFileSize(totalSize)}</div>
        </div>
      )}
      <div className="border-b-2 border-dashed border-gray-200 mt-8 mb-5"></div>
      <div className="flex justify-between text-sm mb-1">
        <span>Total size:</span>
        <div className="text-right">
          <span className="font-bold">{formatFileSize(totalSize)}</span>
          {maxSize !== undefined && (
            <div className="text-xs font-bold">/ {formatFileSize(maxSize)}</div>
          )}
        </div>
      </div>
      {maxSize !== undefined && totalSize > maxSize && (
        <div className="text-xs text-red-500 mt-1">Size limit exceeded</div>
      )}
    </div>
  )
}

export default SourcesSummary 