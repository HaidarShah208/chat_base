import React from "react";
import Dropdown from "./Dropdown";
import type { SidebarProps } from "../types/types";

const Sidebar: React.FC<SidebarProps> = ({ tabs, activeTab, onTabClick }) => {
  const dropdownOptions = tabs.map((t) => ({
    value: t.route,
    label: t.label,
    icon: t.icon,
  }));

  return (
    <>
      <div className="block lg:hidden w-full">
        <Dropdown
          value={activeTab}
          onChange={onTabClick}
          options={dropdownOptions}
          placeholder="Select Tab"
          fullWidth
        />
      </div>
      <aside className="hidden lg:flex lg:w-52 w-full bg-white rounded-xl h-fit flex-col gap-2 top-24">
        {tabs.map((t) => (
          <button
            key={t.label}
            className={`group flex items-center gap-3 leading-6 p-2 rounded-lg text-left font-semibold text-sm transition-all
            ${activeTab === t.route
              ? "bg-gray-50 text-black"
              : "bg-transparent text-gray-700 hover:bg-gray-50 hover:text-black"}
          `}
            onClick={() => onTabClick(t.route)}
          >
            <span
              className={`text-lg ${
                activeTab !== t.route && "text-gray-400 group-hover:text-black"
              }`}
            >
              {t.icon}
            </span>
            {t.label}
          </button>
        ))}
      </aside>
    </>
  );
};

export default Sidebar; 