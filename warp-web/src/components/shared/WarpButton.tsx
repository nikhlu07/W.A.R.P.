import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface WarpButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const WarpButton = forwardRef<HTMLButtonElement, WarpButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "font-mono font-bold uppercase cursor-pointer transition-all duration-100",
          variant === "primary" &&
            "bg-warp-yellow text-warp-black border-2 border-warp-black px-6 py-3 shadow-[6px_6px_0px_0px_#050505] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#050505] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
          variant === "secondary" &&
            "bg-transparent text-warp-black border border-warp-black px-6 py-3 hover:bg-warp-black hover:text-warp-yellow duration-150",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

WarpButton.displayName = "WarpButton";
export default WarpButton;
