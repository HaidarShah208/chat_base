import React from 'react';
import type { NotionConnectModalProps } from '../../types/types';    

const NotionConnectModal: React.FC<NotionConnectModalProps> = ({ open, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 px-2 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Connect Notion</h2>
        <p className="text-gray-600 text-sm mb-2">
          Please note that the pages you select will affect the Notion pages Chatbase has access to across all your agents, as well as any other Chatbase accounts connected to the same Notion account.
        </p>
        <p className="text-gray-600 text-sm mb-2">
          If you have any previously selected pages for other active agents. Please leave them selected.
        </p>
        <p className="text-sm font-normal mb-4">
          Note: <span className="font-normal">Please do not unselect already selected pages.</span>
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="bg-black text-sm text-white px-5 py-1.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            onClick={onConfirm}
          >
            I understand
          </button>
          <button
            className="border border-gray-200 px-5 py-1.5 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotionConnectModal; 