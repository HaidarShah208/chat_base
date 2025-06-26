import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";

const ExportButton = () => {
    const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
    const exportMenuRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
          setIsExportMenuOpen(false);
        }
      };
      if (isExportMenuOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isExportMenuOpen]);
  return (
    <div className="relative" ref={exportMenuRef}>
    <button 
      className="flex items-center gap-2 px-5 py-1 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
    >
      <span className="hidden md:inline">Export</span>
     <Download className="w-4 h-4" />
    </button>
    {isExportMenuOpen && (
      <div className="absolute right-0 px-1 rounded-md mt-2 w-28 bg-white  shadow-lg border z-10">
        <ul className="py-1">
          <li>
            <button className="w-full text-left block px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">JSON</button>
          </li>
          <li>
            <button className="w-full text-left block px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">PDF</button>
          </li>
          <li>
            <button className="w-full text-left block px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">CSV</button>
          </li>
        </ul>
      </div>
    )}
  </div>
  )
};

export default ExportButton;
