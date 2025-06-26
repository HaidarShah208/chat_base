import React from "react";
import type { MobileMenuDrawerProps } from "../types/types";


const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({ open, onClose }) => {
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-200 ${open ? 'opacity-40' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 left-0 w-full max-w-full bg-white  transform transition-transform duration-200 ${open ? 'translate-y-0' : '-translate-y-full'}`} style={{height: '100vh'}}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-black rounded flex items-center justify-center">
              <img src="/images/logo.png" alt="logo" className="w-6 h-6" />
            </div>
            <span className="font-semibold text-lg truncate max-w-[120px]">Ali Haidar's...</span>
          </div>
          <button onClick={onClose} aria-label="Close menu" className="p-2">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col h-full p-6 pt-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-semibold text-sm">Ali Haidar</div>
              <div className="text-xs text-gray-500">haider753841@gmail.com</div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=64&h=64"
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <button className="text-left py-2 px-1 w-full hover:bg-gray-100 rounded">Dashboard</button>
            <button className="text-left py-2 px-1 w-full hover:bg-gray-100 rounded">Account Settings</button>
            <button className="text-left py-2 px-1 w-full hover:bg-gray-100 rounded">Create or join a team</button>
            <button className="text-left py-2 px-1 w-full hover:bg-gray-100 rounded">Sign out</button>
          </div>
          <div className="font-semibold text-sm text-gray-700 mb-2 mt-2">Resources</div>
          <div className="flex flex-col gap-2">
            <button className="text-left py-2 px-1 w-full hover:bg-gray-100 rounded">Help</button>
            <button className="text-left py-2 px-1 w-full hover:bg-gray-100 rounded">Changelog</button>
            <button className="text-left py-2 px-1 w-full hover:bg-gray-100 rounded">Docs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuDrawer; 