import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const MembersMenu = () => {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setTimeout(() => {
        if (dropdownRef.current) {
          const dropdownWidth = dropdownRef.current.offsetWidth;
          const left = rect.left + rect.width / 2 - dropdownWidth / 2 + window.scrollX;
          const top = rect.bottom + 8 + window.scrollY;
          setDropdownStyle({ top, left });
        }
      }, 0);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="More actions"
      >
        <span className="inline-block w-6 text-center">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>
        </span>
      </button>
      {open && createPortal(
        <div
          ref={dropdownRef}
          className="z-50 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 border border-gray-100 absolute"
          style={{
            top: dropdownStyle.top,
            left: dropdownStyle.left,
            minWidth: 140,
          }}
        >
          <div className="px-4 py-2 text-xs font-semibold text-gray-700 border-b">Actions</div>
          <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-50 font-medium">Leave team</button>
        </div>,
        document.body
      )}
    </>
  );
};

export default MembersMenu; 