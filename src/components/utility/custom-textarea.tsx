import { TextareaHTMLAttributes, forwardRef } from "react";

import { classNames } from "@/utility/classNames";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const CustomTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={classNames(
          "resize-vertical w-full rounded-lg border-2 border-transparent bg-background font-semibold text-accent placeholder:font-normal placeholder:text-zinc-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-accent",
          className,
        )}
      />
    );
  },
);

CustomTextarea.displayName = "CustomTextarea";

export default CustomTextarea;
