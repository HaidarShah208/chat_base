import { useState } from "react"
import type { NotificationsTabProps } from "../../types/types"

const NotificationsTab = ({ onSave }: NotificationsTabProps) => {
  const [dailyLeads, setDailyLeads] = useState(false)
  const [dailyConversations, setDailyConversations] = useState(false)

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">Receive email with daily leads</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={dailyLeads}
              onChange={(e) => setDailyLeads(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-600">Receive email with daily conversations</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={dailyConversations}
              onChange={(e) => setDailyConversations(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button 
          onClick={onSave} 
          className="bg-black text-white font-medium py-2 px-6 rounded-lg text-sm hover:bg-gray-800 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default NotificationsTab 