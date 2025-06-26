import React from 'react';
import type { GlobalInputProps } from '../../types/types';


const GlobalInput: React.FC<GlobalInputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className = '',
  name
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={`w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-0 ${className}`}
      />
    </div>
  );
};

export default GlobalInput; 