import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { settingsSidebarTabs } from "../constants/Data";
import { useState } from "react";
import UpgradeModal from "../components/Setting/UpgradeModel";
import GeneralTab from "../components/AgentSettings/GeneralTab";
import MembersTab from "../components/AgentSettings/MembersTab";
import BillingTab from "../components/AgentSettings/BillingTab";
import PlanTab from "../components/AgentSettings/PlanTab";

const Setting = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const activeTab = tab || "general";
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const handleInviteMembers = () => {
    setIsUpgradeModalOpen(true);
  };

  const handleDeleteTeam = () => {
    console.log("Delete team clicked");
  };

  return (
    <div className="w-full container mx-auto md:p-0 p-4 md:px-8 lg:px-12">
      <h1 className="md:text-3xl text-2xl font-semibold mb-6 mt-4 md:mt-6">Settings</h1>
      <div className="flex flex-col lg:flex-row w-full min-h-[80vh] gap-6 max-w-[1400px] mx-auto">
        <Sidebar
          tabs={settingsSidebarTabs}
          activeTab={activeTab}
          onTabClick={(route) => navigate(`/dashboard/setting/${route}`)}
        />
        <div className="flex-1">
          {activeTab === "general" && <GeneralTab 
            onDeleteTeam={handleDeleteTeam}
          />}
          {activeTab === "members" && <MembersTab onInviteMembers={handleInviteMembers} />}
          {activeTab === "billing" && <BillingTab />}
          {activeTab === "plans" && <PlanTab />}
        </div>
      </div>
      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
    </div>
  );
};

export default Setting;
