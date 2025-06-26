import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TabContentPanel from "../components/ChatbotConnectTab/ChatbotConnectTab";
import { connectSidebarTabs } from "../constants/Data";
import EmbedPublic from "../components/ConnectWithEmbed/Embed";
import Share from "../components/ConnectWithEmbed/Share";

const ConnectPage = () => {
  const { id, tab } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = tab || "embed";
  const [showPublicComponent, setShowPublicComponent] = useState(false);

  useEffect(() => {
    if (location.pathname === `/dashboard/chatbot/${id}/connect`) {
      navigate(`/dashboard/chatbot/${id}/connect/embed`, { replace: true });
    }
  }, [id, location.pathname, navigate]);

  const handleTabClick = (route: string) => {
    navigate(`/dashboard/chatbot/${id}/connect/${route}`);
    setShowPublicComponent(false); 
  };

  const handleMakePublic = () => {
    if (activeTab === "embed" || activeTab === "share") {
      setShowPublicComponent(true);
    }
  };

  return (
    <div className="w-full container md:p-0 p-4 mx-auto md:px-8 lg:px-12">
      <h1 className="text-3xl font-semibold mb-6 mt-4 md:mt-8">Connect</h1>
      <div className="flex flex-col lg:flex-row w-full gap-6 mx-auto">
        <Sidebar
          tabs={connectSidebarTabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <div className="flex-1">
          {activeTab === "embed" && showPublicComponent ? (
            <EmbedPublic />
          ) : activeTab === "embed" ? (
            <TabContentPanel
              title="Embed"
              description="The AI agent is private, to share the agent, change the visibility to public."
              showActionButton
              onActionClick={handleMakePublic}
            />
          ) : null}
          {activeTab === "share" && showPublicComponent ? (
            <Share />
          ) : activeTab === "share" ? (
            <TabContentPanel
              title="Share"
              description="The AI agent is private, to share the agent, change the visibility to public."
              showActionButton
              onActionClick={handleMakePublic}
            />
          ) : null}
          {activeTab === "integrations" && (
            <TabContentPanel
              title="Integrations"
              description="Integrations options will be available here."
              showActionButton
              onActionClick={handleMakePublic}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectPage; 