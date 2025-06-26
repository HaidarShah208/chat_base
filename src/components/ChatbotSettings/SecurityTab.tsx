import type { SecurityTabProps } from "../../types/types"
 
import Dropdown from "../Dropdown"
import NumberInput from "../Form/NumberInput"
import { visibilityOptions } from "../../constants/DropdownOptions"



const SecurityTab = ({
  visibility,
  setVisibility,
  allowSpecificDomains,
  setAllowSpecificDomains,
  domains,
  setDomains,
  messageLimit,
  setMessageLimit,
  messageLimitInterval,
  setMessageLimitInterval,
  limitMessage,
  setLimitMessage,
}: SecurityTabProps) => {
  
  const handleReset = () => {
    setMessageLimit(20)
    setMessageLimitInterval(240)
    setLimitMessage("Too many messages in a row")
  }

  return (
    <div className="bg-white rounded-xl border p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Security</h2>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
          <Dropdown
            value={visibility}
            onChange={setVisibility}
            options={visibilityOptions}
            fullWidth={true}
          />
          <p className="text-sm text-gray-500 mt-2">
            'private' : No one can access your agent except you (your account) <br />
            'public' : Other people can chat with your agent if you send them the link. You can also embed it on your website so your website visitors are able to use it. 
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm">Only allow the iframe and widget on specific domains</label>
            <button
              onClick={() => setAllowSpecificDomains(!allowSpecificDomains)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                allowSpecificDomains ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  allowSpecificDomains ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {allowSpecificDomains && (
            <>
              <textarea
                value={domains}
                onChange={(e) => setDomains(e.target.value)}
                placeholder="example.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-0 min-h-[50px]"
              />
              <p className="text-sm text-gray-500 mt-2">
                Your agent visibility has to be 'public' for this to work. Enter each domain in a new line
              </p>
            </>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Rate limiting</label>
            <button
              onClick={handleReset}
              className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 border border-gray-300 rounded-md"
            >
              Reset
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-3">
            <div>
              <span className="text-sm me-2 text-gray-700">Limit to</span>
              <NumberInput
                value={messageLimit}
                onChange={setMessageLimit}
              />
            </div>
            <div>
              <span className="text-sm me-2 text-gray-700">messages every</span>
              <NumberInput
                value={messageLimitInterval}
                onChange={setMessageLimitInterval}
              />
              <span className="text-sm ms-2 text-gray-700">seconds.</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-3">
            Limit the number of messages sent from one device on the iframe and chat bubble (this limit will not be applied to you on chatbase.co, only on your website for your users to prevent abuse).
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mt-10 mb-2">Message to show when limit hit</label>
            <input
              type="text"
              value={limitMessage}
              onChange={(e) => setLimitMessage(e.target.value)}
              placeholder="Too many messages in a row"
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button className="bg-black text-white font-medium py-2 px-6 rounded-lg text-sm hover:bg-gray-800 transition-colors">
          Save
        </button>
      </div>
    </div>
  )
}

export default SecurityTab