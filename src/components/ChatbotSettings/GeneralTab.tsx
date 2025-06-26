import { useState } from "react";
import type { GeneralTabProps } from "../../types/types"
import DangerZone from "../DangerZone"
import { CheckIcon, CopyIcon, InfoIcon } from "lucide-react"

const GeneralTab = ({
  creditLimitEnabled,
  setCreditLimitEnabled,
  creditLimit,
  setCreditLimit,
}: GeneralTabProps) => {
  const [copied, setCopied] = useState(false);
  const agentName = "8613 Topic approval request.docx + other files";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleDeleteTeam = () => {
    console.log("Delete team clicked");
  }

  return (
    <>
      <div className="bg-white rounded-xl border p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">General</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Agent ID</label>
          <div className="flex items-center gap-3">
            <div className="text-gray-900 font-medium">t3P4wT0rUBjp5E9-DkUGe</div>
            <button
              onClick={() => copyToClipboard("t3P4wT0rUBjp5E9-DkUGe")}
              className="p-1.5 border border-gray-200 hover:bg-gray-100 rounded-md transition-colors"
              title="Copy to clipboard"
            >
              <span className="text-gray-900 py-2">
                {copied ? <CheckIcon className="w-5 h-5 text-black" /> : <CopyIcon className="w-5 h-5" />}
              </span>
            </button>

          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
          <div className="text-gray-900 font-semibold">643 B</div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-900">
            {agentName}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Credit limit</label>
              <InfoIcon className="w-4 h-4" />
            </div>
            <button
              onClick={() => setCreditLimitEnabled(!creditLimitEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${creditLimitEnabled ? "bg-green-500" : "bg-gray-200"
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${creditLimitEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>
          </div>

          {creditLimitEnabled && (
            <div className="relative">
              <input
                type="number"
                value={creditLimit}
                onChange={(e) => setCreditLimit(Number.parseInt(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-0"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end mt-8">
          <button className="bg-black text-white font-medium py-2 px-6 rounded-lg text-sm hover:bg-gray-800 transition-colors">
            Save
          </button>
        </div>
      </div>
      <div className="my-10">
        <div className="flex items-center mb-10">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="mx-4 text-xs font-semibold text-red-400 tracking-widest">DANGER ZONE</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>
        <DangerZone
          heading="Delete all conversations"
          description="Once you delete all your conversations, there is no going back. Please be certain. All the conversations on this agent will be deleted."
          buttonText="Delete"
          onConfirmDelete={handleDeleteTeam}
          maxDescriptionLength={85}
          modalTitle="Delete Conversations"
          modalDescription="Are you sure you want to delete all conversations for this chatbot? This action cannot be undone."
        />
        <DangerZone
          heading="Delete agent"
          description="Once you delete your agent, there is no going back. Please be certain. All your uploaded data will be deleted."
          buttonText="Delete"
          onConfirmDelete={handleDeleteTeam}
          maxDescriptionLength={73}
          modalTitle={`Delete ${agentName}?`}
          modalDescription="Are you sure you want to delete your agent? This action cannot be undone."
          valueToConfirm={agentName}
          modalInputLabel="Agent Name"
          modalInputHelpText="Please type your agent name to confirm"
        />
      </div>
    </>
  )
}

export default GeneralTab 