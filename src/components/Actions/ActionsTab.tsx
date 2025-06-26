import { Zap } from "lucide-react";

const ActionsTab = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Zap className="w-6 h-6 text-gray-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Create your first action
        </h2>
        <p className="text-gray-500 text-sm mb-4 max-w-md">
          Connect to an integration or create your own actions.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800">
            Create action
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50">
            View all integrations
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionsTab; 