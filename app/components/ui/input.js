import * as React from "react";
import { cn } from "../../lib/utils";
import "../../styles/input.css"; // Import CSS file for styles

const Input = React.forwardRef(({ className, type, placeholder, label, ...props }, ref) => {
  return (
    <div className="bg-white rounded-lg relative">
      <input
        type={type}
        id={label}
        name={label}
        className={cn("input-field peer", className)}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
      <label
        htmlFor={label}
        className="input-label cursor-pointer"
      >
        {placeholder}
      </label>
    </div>
  );
});

Input.displayName = "Input";

export { Input };
