import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface WarpBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

const WarpBadge = forwardRef<HTMLDivElement, WarpBadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-3 py-1 text-xs font-mono font-bold uppercase",
          variant === "default" && "bg-warp-black text-warp-yellow border-2 border-warp-yellow",
          variant === "outline" && "bg-transparent text-warp-black border-2 border-warp-black",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default WarpBadge;
