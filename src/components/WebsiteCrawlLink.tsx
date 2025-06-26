import { InfoIcon } from "lucide-react"
import React from "react"
import type { WebsiteCrawlLinkProps } from "../types/types"


const WebsiteCrawlLink: React.FC<WebsiteCrawlLinkProps & { buttonLabel?: any }> = ({
  url,
  onUrlChange,
  includePaths,
  onIncludePathsChange,
  excludePaths,
  onExcludePathsChange,
  hasContent,
  error,
  buttonLabel = "Fetch links",
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
          <div className="flex">
            <select className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-md rounded-b-none bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>https://</option>
              <option>http://</option>
            </select>
            <input
              type="text"
              placeholder="www.example.com"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-0 text-sm"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-[#FAFAFA] border border-t-0 rounded rounded-t-none p-3 flex items-start gap-2">
          <InfoIcon className="w-4 h-4 text-[#71717B] " />
          <p className="text-sm text-[#71717B] font-semibold">
            If you add multiple crawl links, they will all be marked as "pending" and will not overwrite one another.
          </p>
        </div>
          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Include only paths</label>
          <input
            type="text"
            placeholder="Ex: blog/*, dev/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-sm"
            value={includePaths}
            onChange={(e) => onIncludePathsChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Exclude paths</label>
          <input
            type="text"
            placeholder="Ex: blog/*, dev/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-sm"
            value={excludePaths}
            onChange={(e) => onExcludePathsChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className={`px-4 py-2 rounded-md transition-colors ${
            hasContent
              ? "bg-black hover:bg-gray-800 text-white"
              : "bg-gray-500 text-white cursor-not-allowed"
          }`}
          disabled={!hasContent}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export default WebsiteCrawlLink
