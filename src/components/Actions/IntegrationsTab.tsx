import { Search } from "lucide-react"
import Integration from "../Integration"
import { integrations } from "../../constants/Data"

const IntegrationsTab = () => {

  return (
    <div className="bg-white mb-10 px-6">
      <div className="flex w-full justify-end">
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search integrations..."
            className="block pl-10 pr-3 py-1.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration, index) => (
          <Integration
            key={index}
            imageUrl={integration.imageUrl}
            title={integration.title}
            description={integration.description}
            customIcon={integration.customIcon}
          />
        ))}
      </div>
    </div>
  )
}

export default IntegrationsTab
