import React from 'react';
import type { ConfirmationModalProps } from '../types/types';  


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  Icon,
  confirmButtonClass = 'bg-gray-900 hover:bg-gray-800',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-lg transform transition-all opacity-100 scale-100">
        <div className="flex flex-col items-start">
                {Icon && (
                <div className="p-3 bg-gray-100 rounded-full">
                    <Icon className="w-6 h-6 text-gray-600" />
                </div>
                )}
            <div className="flex items-center gap-4 mt-3">
                <div>
                <h2 className="text-xl font-bold text-gray-700">{title}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {description.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {index === 0 ? line : <span className="font-semibold">{line}</span>}
                      {index < description.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                </div>
            </div>
        
        </div>
        
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2 text-sm font-semibold text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 