import { type IntegrationProps } from "../types/types";

const Integration = ({ imageUrl, title, description, customIcon }: IntegrationProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-center mb-4">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-12 h-12" />
        ) : customIcon ? (
          customIcon
        ) : (
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-6">{description}</p>
      <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
        Connect
      </button>
    </div>
  );
};

export default Integration; 