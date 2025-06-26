import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Chatbot from "../pages/Chatbot";
import LandingPage from "../pages/LandingPage";
import Usage from "../pages/Usage";
import Setting from "../pages/Setting";
import CreateNewChatbot from "../pages/CreateNewChatbot";
import NotFound from "../components/NotFound/NotFound";
import Activity from "../pages/Activity";
import Playground from "../pages/Playground";
import ActivityChatLogs from "../components/Activity/ActivityChatLogs";
import ActivityLeads from "../components/Activity/ActivityLeads";
import ChatbotSources from "../pages/ChatbotSources";
import ConnectPage from "../pages/ChatbotConnect";
import AgentSettingsPage from "../pages/AgentSettings";
import ChatbotDetail from "../layout/ChatbotDetail";
import Contacts from "../pages/Contacts";
import Actions from "../pages/Actions";
import ActionsTab from "../components/Actions/ActionsTab";
import IntegrationsTab from "../components/Actions/IntegrationsTab";
import ChatbotWidget from "../pages/ChatbotWidget";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chatbot-widget" element={<ChatbotWidget />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard/chatbot" element={<Chatbot />} />
          <Route path="/dashboard/usage" element={<Usage />} />
          <Route path="/dashboard/setting/:tab" element={<Setting />} />
          <Route path="/dashboard/create-new-chatbot/:tab" element={<CreateNewChatbot />} />
          <Route path="/dashboard/chatbot/:id/*" element={<ChatbotDetail />}>
            <Route index element={<Playground />} />
            <Route path="activity" element={<Activity />}>
              <Route index element={<ActivityChatLogs />} />
              <Route path="chat-logs" element={<ActivityChatLogs />} />
              <Route path="leads" element={<ActivityLeads />} />
            </Route>
            <Route path="sources/:tab" element={<ChatbotSources />} />
            <Route path="connect/:tab" element={<ConnectPage />} />
            <Route path="settings/:tab" element={<AgentSettingsPage />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="actions" element={<Actions />}>
              <Route index element={<ActionsTab />} />
              <Route path="actions" element={<ActionsTab />} />
              <Route path="integrations" element={<IntegrationsTab />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default AppRoute;
