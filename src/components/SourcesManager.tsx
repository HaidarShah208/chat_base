import React, { useState } from "react";
import { Search, X, Trash2, MoreHorizontal, RotateCcw, ChevronRight, SearchIcon } from "lucide-react";
import type { SourcesManagerProps } from "../types/types";
import Dropdown from "./Dropdown";
import { sortByOptions } from "../constants/DropdownOptions";
import ConfirmationModal from "./ConfirmationModal";

const SourcesManager: React.FC<SourcesManagerProps> = ({
  items,
  title,
  searchTerm,
  onSearchChange,
  selectedItems,
  onSelectItem,
  onSelectAll,
  onDeleteItems,
  onRestore,
  getItemIcon,
  formatItemDetails,
  showRestore = false,
  emptySearchMessage = "No items found matching"
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("Default");

  const handleDeleteClick = (ids: string[]) => {
    setItemsToDelete(ids);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    onDeleteItems(itemsToDelete);
    setItemsToDelete([]);
    setIsDeleteModalOpen(false);
  };

  const handleRestore = () => {
    if (onRestore) {
      onRestore();
    }
    setIsRestoreModalOpen(false);
  };

  const handleIndividualDelete = (id: string) => {
    handleDeleteClick([id]);
    setOpenMenuId(null);
  };

  const allSelected = items.length > 0 && selectedItems.length === items.length;

  return (
    <>
      <div className="mt-5 mb-20 bg-white rounded-xl border p-4 sm:p-8 shadow-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-0"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex w-full items-center pb-5 border-b border-gray-200 justify-between mb-4">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="mr-2 rounded shadow-sm border-gray-200 accent-black focus:ring-0"
            />
            Select all
          </label>

          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Sort by:</span>
            <div className="relative">
              <Dropdown
                value={sortBy}
                onChange={setSortBy}
                options={sortByOptions}
                dropdownWidth="w-48"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-1 rounded-lg transition-colors ${
                selectedItems.includes(item.id)
                  ? ""
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3 flex-1">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => onSelectItem(item.id)}
                  className="rounded border-gray-200 shadow-sm accent-black focus:ring-0"
                />
                {getItemIcon(item)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-sm text-gray-900 truncate">
                      {item.name}
                    </h4>
                    {item.isNew && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  {formatItemDetails && (
                    <p className="text-xs text-gray-700 mt-1">
                      {formatItemDetails(item)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 relative">
                <button 
                  onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
                {openMenuId === item.id && (
                  <div className="absolute -left-14 top-9 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                    <button
                      onClick={() => handleIndividualDelete(item.id)}
                      className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && searchTerm && (
          <div className="text-center py-8 flex flex-col items-center text-gray-500">
          <SearchIcon className="w-5 h-5" /> {emptySearchMessage}
          </div>
        )}
      </div>

      {selectedItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white rounded-lg shadow-lg p-2 flex items-center space-x-3 z-50">
          <span className="font-medium text-xs px-2">{selectedItems.length} selected</span>
          <button
            onClick={() => handleDeleteClick(selectedItems)}
            className="flex items-center space-x-4 text-red-500 border border-gray-600 rounded-md px-4 py-1 text-xs font-semibold hover:border-red-700 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
          {showRestore && onRestore && (
            <button
              onClick={() => setIsRestoreModalOpen(true)}
              className="flex items-center space-x-4 text-green-500 border border-gray-600 rounded-md px-4 py-1 text-xs font-semibold hover:border-green-700 hover:text-green-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restore</span>
            </button>
          )}
        </div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemsToDelete([]);
        }}
        onConfirm={handleDelete}
        title={`Delete ${title.toLowerCase().replace(' sources', '')}`}
        description={`Are you sure you want to permanently delete ${itemsToDelete.length} source${itemsToDelete.length === 1 ? '' : 's'}?\nAll untrained sources will be permanently deleted and cannot be restored.`}
        confirmText="Delete"
        Icon={Trash2}
        confirmButtonClass="bg-red-600 hover:bg-red-700 focus:ring-red-500"
      />

      {showRestore && onRestore && (
        <ConfirmationModal
          isOpen={isRestoreModalOpen}
          onClose={() => setIsRestoreModalOpen(false)}
          onConfirm={handleRestore}
          title={`Restore ${title.toLowerCase().replace(' sources', '')}`}
          description={`Are you sure you want to restore ${selectedItems.length} source${selectedItems.length === 1 ? '' : 's'}?`}
          confirmText="Restore"
          Icon={RotateCcw}
          confirmButtonClass="bg-gray-900 hover:bg-gray-800 focus:ring-gray-500"
        />
      )}
    </>
  );
};

export default SourcesManager; 