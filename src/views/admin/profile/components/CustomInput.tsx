

import React from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string|number;
  type?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ value,placeholder, onChange, ...props }) => {
  return (
    <input
      type={props.type || 'text'}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="mt-1 w-full rounded-md bg-gray-100 border-gray-200 border-[1px] text-sm text-gray-700 shadow-sm h-[55px] px-[10px]"
      {...props}
    />
  );
};

export default CustomInput;
