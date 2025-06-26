import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar"
import { activityTabs } from "../constants/Data";

const Activity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes("leads") ? "leads" : "chat-logs";

  useEffect(() => {
    if (location.pathname === `/dashboard/chatbot/${id}/activity`) {
      navigate(`/dashboard/chatbot/${id}/activity/chat-logs`, { replace: true });
    }
  }, [id, location.pathname, navigate]);

  const handleTabClick = (route: string) => {
    navigate(`/dashboard/chatbot/${id}/activity/${route}`);
  };

  return (
    <div className="w-full container md:p-0 p-4 mx-auto md:px-8 lg:px-12">
      <h1 className="text-3xl font-semibold mb-6 mt-4 md:mt-8">Activity</h1>
      <div className="flex flex-col lg:flex-row w-full gap-6 max-w-[1400px] mx-auto">
        <Sidebar
          tabs={activityTabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Activity
