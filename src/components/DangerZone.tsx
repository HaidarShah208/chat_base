import { useState } from "react";
import type { DangerZoneProps } from "../types/types";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const insertLineBreakAfter = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;

  let breakIndex = text.lastIndexOf(" ", maxLength);
  if (breakIndex === -1) breakIndex = maxLength;

  return `${text.slice(0, breakIndex)}\n${text.slice(breakIndex + 1)}`;
};

const DangerZone = ({
  heading,
  description,
  buttonText,
  onConfirmDelete,
  modalTitle,
  modalDescription,
  valueToConfirm,
  modalInputLabel,
  modalInputHelpText,
  maxDescriptionLength = 80,
}: DangerZoneProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedDescription = insertLineBreakAfter(description, maxDescriptionLength);

  return (
    <>
      <div className="border border-red-300 rounded-xl mb-5 p-6 bg-white shadow-sm">
        <h3 className="text-2xl font-bold text-red-600 mb-3">{heading}</h3>
        <div className="mb-1 whitespace-pre-line text-gray-900 leading-relaxed">
          {formattedDescription}
        <span className="font-semibold text-black mb-4"> This action is not reversible</span>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg text-sm mt-2"
            onClick={() => setIsModalOpen(true)}
          >
            {buttonText}
          </button>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          onConfirmDelete();
          setIsModalOpen(false);
        }}
        title={modalTitle}
        description={modalDescription}
        valueToConfirm={valueToConfirm}
        inputLabel={modalInputLabel}
        inputHelpText={modalInputHelpText}
      />
    </>
  );
};

export default DangerZone;
