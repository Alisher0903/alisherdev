import { InputHTMLAttributes, forwardRef } from "react";

import { classNames } from "@/utility/classNames";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={classNames(
          "w-full rounded-lg border-2 border-transparent bg-background font-semibold text-accent placeholder:font-normal placeholder:text-zinc-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-accent",
          className,
        )}
      />
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
