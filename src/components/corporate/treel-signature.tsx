import React from "react";

export type SignatureVariant = 
  | "hero" 
  | "divider" 
  | "compact" 
  | "editorial" 
  | "background" 
  | "frame";

export interface TreelSignatureProps {
  variant?: SignatureVariant;
  className?: string;
  color?: string;
}

export function TreelSignature({
  variant = "compact",
  className = "",
  color = "#D5573B"
}: TreelSignatureProps) {
  if (variant === "hero") {
    return (
      <div className={`w-full relative flex items-center justify-center select-none ${className}`} aria-hidden="true">
        <svg
          viewBox="0 0 380 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[360px] xl:max-w-[400px] h-auto"
        >
          <g fill={color}>
            {/* Three clean horizontal bars derived directly from the original Treel logo */}
            <polygon points="50,31 350,31 345,65 45,65" />
            <polygon points="42,83 342,83 337,117 37,117" />
            <polygon points="34,135 334,135 329,169 29,169" />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === "divider") {
    return (
      <div className={`flex items-center gap-1.5 py-4 select-none ${className}`} aria-hidden="true">
        <div className="h-[3px] w-12 rounded-full bg-[#D5573B]" />
        <div className="h-[3px] w-6 rounded-full bg-[#D5573B]/70" />
        <div className="h-[3px] w-3 rounded-full bg-[#D5573B]/40" />
      </div>
    );
  }

  if (variant === "editorial") {
    return (
      <div className={`inline-flex flex-col gap-1.5 select-none ${className}`} aria-hidden="true">
        <div className="h-[3px] w-10 rounded-sm bg-[#D5573B]" />
        <div className="h-[3px] w-7 rounded-sm bg-[#D5573B]" />
        <div className="h-[3px] w-4 rounded-sm bg-[#D5573B]" />
      </div>
    );
  }

  if (variant === "background") {
    return (
      <div 
        className={`absolute pointer-events-none select-none opacity-[0.05] overflow-hidden ${className}`} 
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 380 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <g fill={color}>
            <polygon points="50,31 350,31 345,65 45,65" />
            <polygon points="42,83 342,83 337,117 37,117" />
            <polygon points="34,135 334,135 329,169 29,169" />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === "frame") {
    return (
      <div className={`flex flex-col gap-1 select-none ${className}`} aria-hidden="true">
        <div className="h-[2.5px] w-6 rounded-sm bg-[#D5573B]" />
        <div className="h-[2.5px] w-6 rounded-sm bg-[#D5573B]" />
        <div className="h-[2.5px] w-6 rounded-sm bg-[#D5573B]" />
      </div>
    );
  }

  // Default: "compact"
  return (
    <span className={`inline-flex flex-col gap-[3px] shrink-0 select-none align-middle ${className}`} aria-hidden="true">
      <span className="h-[2px] w-4 rounded-full bg-[#D5573B]" />
      <span className="h-[2px] w-4 rounded-full bg-[#D5573B]" />
      <span className="h-[2px] w-4 rounded-full bg-[#D5573B]" />
    </span>
  );
}

export default TreelSignature;
