import * as React from "react";
import { cn } from "../../lib/utils";

const Checkbox = React.forwardRef(({ id, checked, onChange, children, className, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        ref={ref}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
      >
        {children}
      </label>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
