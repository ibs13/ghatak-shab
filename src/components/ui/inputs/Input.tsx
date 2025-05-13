import React, { forwardRef } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  value?: string;
  htmlFor?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, htmlFor, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && (
          <label
            htmlFor={htmlFor}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`input mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 ${
            error ? "input-error" : ""
          }`}
          {...props}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
