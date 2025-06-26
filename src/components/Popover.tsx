import React, { useRef, useState } from "react";
import type { PopoverHoverProps } from "../types/types"; 


const PopoverHover: React.FC<PopoverHoverProps> = ({ children, content, className = "" }) => {
  const [open, setOpen] = useState(false);
  const timer = useRef<any>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={show}
        onMouseLeave={hide}
        className="cursor-pointer"
      >
        {children}
      </span>
      {open && (
        <div
          onMouseEnter={show}
          onMouseLeave={hide}
          className={`absolute left-0 mt-2 z-50 min-w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm ${className}`}
        >
          {content}
        </div>
      )}
    </span>
  );
};

export default PopoverHover;