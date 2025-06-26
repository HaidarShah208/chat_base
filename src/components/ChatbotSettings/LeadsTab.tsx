import Input from "../Form/Input"
import type { LeadsTabProps } from "../../types/types"

const LeadsTab = ({
  title,
  setTitle,
  nameEnabled,
  setNameEnabled,
  name,
  setName,
  emailEnabled,
  setEmailEnabled,
  email,
  setEmail,
  phoneEnabled,
  setPhoneEnabled,
  phone,
  setPhone,
}: LeadsTabProps) => {
  const handleResetTitle = () => setTitle("Let us know how to contact you")
  const handleResetName = () => setName("Name")
  const handleResetEmail = () => setEmail("Email")
  const handleResetPhone = () => setPhone("Phone Number")

  return (
    <div className="bg-white rounded-xl border p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Leads</h2>

      <p className="text-sm text-gray-500 mb-8">
        Note: Leads form only appears when chatting through the iframe or the chat bubble.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <Input
            value={title}
            onChange={setTitle}
            placeholder="Let us know how to contact you"
            showReset
            onReset={handleResetTitle}
          />
        </div>

        <div className={`py-4 ${!nameEnabled && 'border-b border-gray-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <button
              onClick={() => setNameEnabled(!nameEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                nameEnabled ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  nameEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {nameEnabled && (
            <Input
              value={name}
              onChange={setName}
              placeholder="Name"
              showReset
              onReset={handleResetName}
              isHalfWidth
            />
          )}
        </div>

        <div className={`py-4 ${!emailEnabled && 'border-b border-gray-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <button
              onClick={() => setEmailEnabled(!emailEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailEnabled ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {emailEnabled && (
            <Input
              value={email}
              onChange={setEmail}
              placeholder="Email"
              type="email"
              showReset
              onReset={handleResetEmail}
              isHalfWidth
            />
          )}
        </div>

        <div className={`py-4`}>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <button
              onClick={() => setPhoneEnabled(!phoneEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                phoneEnabled ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  phoneEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {phoneEnabled && (
            <Input
              value={phone}
              onChange={setPhone}
              placeholder="Phone Number"
              type="tel"
              showReset
              onReset={handleResetPhone}
              isHalfWidth
            />
          )}
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

export default LeadsTab 