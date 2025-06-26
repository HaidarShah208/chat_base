import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { actionTabs } from "../constants/Data";

const Actions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes("integrations") ? "integrations" : "actions";

  useEffect(() => {
    if (location.pathname === `/dashboard/chatbot/${id}/actions`) {
      navigate(`/dashboard/chatbot/${id}/actions/actions`, { replace: true });
    }
  }, [id, location.pathname, navigate]);

  const handleTabClick = (route: string) => {
    navigate(`/dashboard/chatbot/${id}/actions/${route}`);
  };

  return (
    <div className="w-full container md:p-0 p-4 mx-auto md:px-8 lg:px-12">
      <h1 className="text-3xl font-semibold mb-6 mt-4 md:mt-8">Actions</h1>
      <div className="flex flex-col lg:flex-row w-full gap-6 max-w-[1400px] mx-auto">
        <Sidebar
          tabs={actionTabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Actions; 