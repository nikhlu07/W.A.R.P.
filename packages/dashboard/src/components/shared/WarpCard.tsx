import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface WarpCardProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
}

const WarpCard = forwardRef<HTMLDivElement, WarpCardProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-warp-white border-2 border-warp-black p-6 relative transition-all duration-200",
          "shadow-[8px_8px_0px_0px_#050505]",
          active && "shadow-none translate-x-[6px] translate-y-[6px]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default WarpCard;
