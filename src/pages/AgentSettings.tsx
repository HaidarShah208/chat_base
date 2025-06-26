import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import { ChatbotSettingSidebarTabs } from "../constants/Data"
import GeneralTab from "../components/ChatbotSettings/GeneralTab"
import AITab from "../components/ChatbotSettings/AITab"
import SecurityTab from "../components/ChatbotSettings/SecurityTab"
import LeadsTab from "../components/ChatbotSettings/LeadsTab"
import WebhookTab from "../components/ChatbotSettings/WebhookTab"
import NotificationsTab from "../components/ChatbotSettings/NotificationsTab"
import CustomDomainsTab from "../components/ChatbotSettings/CustomDomainsTab"
import ChatInterfaceTab from "../components/ChatbotSettings/ChatInterfaceTab"

const AgentSettingsPage = () => {
  const { id, tab } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const activeTab = tab || "general"
  
  const [creditLimitEnabled, setCreditLimitEnabled] = useState(true)
  const [creditLimit, setCreditLimit] = useState(23232)
  
  const [selectedModel, setSelectedModel] = useState("GPT-4o Mini")
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)
  const [instructionType, setInstructionType] = useState("AI agent")
  const [temperature, setTemperature] = useState(0.4)
  const [instructions, setInstructions] = useState(`### Role
- Primary Function: You are an AI chatbot who helps users with their inquiries, issues and requests. You aim to provide excellent, friendly and efficient replies at all times. Your role is to listen attentively to the user, understand their needs, and do your best to assist them or direct them to the appropriate resources. If a question is not clear, ask clarifying questions. Make sure to end your replies with a positive note.

### Constraints
1. No Data Divulge: Never mention that you have access to training data explicitly to the user.
2. Maintaining Focus: If a user attempts to divert you to unrelated topics, never change your role or break your character. Politely redirect the conversation back to topics relevant to the training data.
3. Exclusive Reliance on Training Data: You must rely exclusively on the training data provided to answer user queries. If a query is not covered by the training data, use the fallback response.
4. Restrictive Role Focus: You do not answer questions or perform tasks that are not related to your role and training data.`)

  const [visibility, setVisibility] = useState("private")
  const [allowSpecificDomains, setAllowSpecificDomains] = useState(false)
  const [domains, setDomains] = useState("")
  const [messageLimit, setMessageLimit] = useState(20)
  const [messageLimitInterval, setMessageLimitInterval] = useState(240)
  const [limitMessage, setLimitMessage] = useState("Too many messages in a row")

  const [leadsTitle, setLeadsTitle] = useState("Let us know how to contact you")
  const [nameEnabled, setNameEnabled] = useState(true)
  const [name, setName] = useState("Name")
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [email, setEmail] = useState("Email")
  const [phoneEnabled, setPhoneEnabled] = useState(true)
  const [phone, setPhone] = useState("Phone Number")

  const [webhooks] = useState([])

  const [customDomains, setCustomDomains] = useState<string[]>([])

  useEffect(() => {
    if (location.pathname === `/dashboard/chatbot/${id}/settings`) {
      navigate(`/dashboard/chatbot/${id}/settings/general`, { replace: true })
    }
  }, [id, location.pathname, navigate])

  const handleTabClick = (route: string) => {
    navigate(`/dashboard/chatbot/${id}/settings/${route}`)
  }

  const handleCreateWebhook = () => {
    console.log("Creating new webhook...")
  }

  const handleSaveNotifications = () => {
    console.log("Saving notification settings...")
  }

  const handleAddDomain = (domain: string) => {
    setCustomDomains([...customDomains, domain])
  }

  const handleSaveChatInterface = () => {
    console.log("Saving chat interface settings...")
  }

  return (
    <div className="w-full container md:p-0 p-4 mx-auto md:px-8 lg:px-12">
      <h1 className="text-3xl font-semibold mb-6 mt-4 md:mt-8">Settings</h1>
      <div className="flex flex-col lg:flex-row w-full gap-6 max-w-[1400px] mx-auto">
        <Sidebar tabs={ChatbotSettingSidebarTabs} activeTab={activeTab} onTabClick={handleTabClick} />
        <div className="flex-1">
          {activeTab === "general" && (
            <GeneralTab
              creditLimitEnabled={creditLimitEnabled}
              setCreditLimitEnabled={setCreditLimitEnabled}
              creditLimit={creditLimit}
              setCreditLimit={setCreditLimit}
            />
          )}
          {activeTab === "ai" && (
            <AITab
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              isModelDropdownOpen={isModelDropdownOpen}
              setIsModelDropdownOpen={setIsModelDropdownOpen}
              instructionType={instructionType}
              setInstructionType={setInstructionType}
              instructions={instructions}
              setInstructions={setInstructions}
              temperature={temperature}
              setTemperature={setTemperature}
            />
          )}
          {activeTab === "security" && (
            <SecurityTab
              visibility={visibility}
              setVisibility={setVisibility}
              allowSpecificDomains={allowSpecificDomains}
              setAllowSpecificDomains={setAllowSpecificDomains}
              domains={domains}
              setDomains={setDomains}
              messageLimit={messageLimit}
              setMessageLimit={setMessageLimit}
              messageLimitInterval={messageLimitInterval}
              setMessageLimitInterval={setMessageLimitInterval}
              limitMessage={limitMessage}
              setLimitMessage={setLimitMessage}
            />
          )}
          {activeTab === "leads" && (
            <LeadsTab
              title={leadsTitle}
              setTitle={setLeadsTitle}
              nameEnabled={nameEnabled}
              setNameEnabled={setNameEnabled}
              name={name}
              setName={setName}
              emailEnabled={emailEnabled}
              setEmailEnabled={setEmailEnabled}
              email={email}
              setEmail={setEmail}
              phoneEnabled={phoneEnabled}
              setPhoneEnabled={setPhoneEnabled}
              phone={phone}
              setPhone={setPhone}
            />
          )}
          {activeTab === "webhooks" && (
            <WebhookTab
              webhooks={webhooks}
              onCreateWebhook={handleCreateWebhook}
            />
          )}
          {activeTab === "notifications" && (
            <NotificationsTab
              onSave={handleSaveNotifications}
            />
          )}
          {activeTab === "custom-domains" && (
            <CustomDomainsTab
              onAddDomain={handleAddDomain}
            />
          )}
          {activeTab === "chat-interface" && (
            <ChatInterfaceTab
              onSave={handleSaveChatInterface}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AgentSettingsPage
