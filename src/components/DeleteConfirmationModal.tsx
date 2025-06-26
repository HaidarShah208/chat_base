import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { DeleteConfirmationModalProps } from '../types/types';


const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  valueToConfirm,
  inputLabel,
  inputHelpText,
}: DeleteConfirmationModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(!!valueToConfirm);

  useEffect(() => {
    if (valueToConfirm) {
      setIsConfirmDisabled(inputValue !== valueToConfirm);
    } else {
      setIsConfirmDisabled(false);
    }
  }, [inputValue, valueToConfirm]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setInputValue('');
        setIsConfirmDisabled(!!valueToConfirm);
      }, 200);
    }
  }, [isOpen, valueToConfirm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-[33rem]">
        <div className="flex items-center gap-2">
          <div className="text-red-500 mt-1">
            <AlertTriangle size={32} />
          </div>
          <div>
            <h2 className="text-lg items-center font-bold text-red-600">{title}</h2>
          </div>
        </div>
            <p className="mt-2 leading-tight text-sm text-gray-600">{description}</p>

        {valueToConfirm && (
          <div className="mt-4">
            <label htmlFor="confirmationInput" className="block text-sm font-medium text-gray-900">
              {inputLabel}
            </label>
            <input
              id="confirmationInput"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
            {inputHelpText && <p className="mt-1 text-xs text-gray-500">{inputHelpText}</p>}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isConfirmDisabled}
            className={`px-4 py-1.5 text-sm font-medium text-white rounded-md focus:outline-none ${
              isConfirmDisabled
                ? 'bg-red-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            Delete Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal; 