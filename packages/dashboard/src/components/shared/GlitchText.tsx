import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
}

const GlitchText = ({ text, className, as: Tag = "h1" }: GlitchTextProps) => {
  return (
    <Tag
      className={cn("glitch-text font-unbounded font-extrabold uppercase", className)}
      data-text={text}
    >
      {text}
    </Tag>
  );
};

export default GlitchText;
