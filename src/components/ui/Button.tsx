"use client";
import { useRouter } from "next/navigation";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

// Define the button variants, sizes, and colors
type ButtonVariant = "solid" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";
type ButtonColor = "primary" | "secondary" | "success" | "danger" | "warning";

// Extend the standard button props with our custom ones
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  href?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

// Utility function to combine class names
const classNames = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  size = "md",
  color = "primary",
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  isFullWidth = false,
  isDisabled = false,
  href = "",
  className = "",
  children,
  ...rest
}) => {
  const router = useRouter();
  // Base styles that apply to all buttons
  const baseStyles =
    "rounded cursor-pointer font-medium transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant styles
  const variantStyles = {
    solid: {
      primary:
        "bg-[#824670] text-white hover:bg-[#bf98a0] hover:text-[#824670]",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
      success:
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      warning:
        "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
    },
    outline: {
      primary:
        "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      secondary:
        "border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500",
      success:
        "border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500",
      danger:
        "border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500",
      warning:
        "border border-yellow-600 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500",
    },
    ghost: {
      primary: "text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      secondary: "text-gray-600 hover:bg-gray-50 focus:ring-gray-500",
      success: "text-green-600 hover:bg-green-50 focus:ring-green-500",
      danger: "text-red-600 hover:bg-red-50 focus:ring-red-500",
      warning: "text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500",
    },
    link: {
      primary: "text-blue-600 hover:underline focus:ring-blue-500",
      secondary: "text-gray-600 hover:underline focus:ring-gray-500",
      success: "text-green-600 hover:underline focus:ring-green-500",
      danger: "text-red-600 hover:underline focus:ring-red-500",
      warning: "text-yellow-600 hover:underline focus:ring-yellow-500",
    },
  };

  // Size styles
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base rounded-md",
    lg: "px-6 py-3 text-lg",
  };

  // Combine all styles
  const buttonClass = classNames(
    baseStyles,
    variantStyles[variant][color],
    sizeStyles[size],
    isFullWidth ? "w-full" : "",
    className
  );

  // Handle button click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled || isLoading) {
      e.preventDefault();
      return;
    }
    if (href) {
      router.push(href);
    } else {
      if (rest.onClick) {
        rest.onClick();
      }
    }
  };

  return (
    <button
      className={buttonClass}
      disabled={isDisabled || isLoading}
      {...rest}
      onClick={handleClick}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          {/* You can replace this with your actual spinner component */}
          {loadingText || "Loading..."}
        </span>
      ) : (
        <span className="flex items-center justify-center">
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </span>
      )}
    </button>
  );
};

export default Button;
