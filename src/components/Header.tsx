import { useLocation, matchPath, Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useState } from "react";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { agentNavLinks } from "../constants/Data";
import Switcher from "./Switcher";
import { MenuIcon } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hideNavLinks = location.pathname.startsWith("/dashboard/create-new-chatbot");

  const isAgentDetail = matchPath("/dashboard/chatbot/:id/*", location.pathname);
  const navLinks = isAgentDetail ? agentNavLinks.map(l => ({
    ...l,
    to: l.to.replace(":id", location.pathname.split("/")[3] || "")
  })) : undefined;
  
  const teams = [{ name: "ali" }];
  const agents = [{ name: "shorcut keys..." }];

  return (
    <header className="w-full bg-white border-gray-200">
      <div className="mx-auto px-6 py-1">
        <div className="flex items-center pt-2 justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <div className=" rounded flex items-center justify-center">
              <img src="/images/favicon.png" alt="logo" className="w-6 h-6" />
            </div>
          </Link>
            <p className="text-gray-300"> / </p>
            <Switcher 
              items={teams}
              initialSelectedItem="ali"
              searchPlaceholder="Search team..."
              listTitle="Teams"
              createText="Create or join a team"
            />
            {isAgentDetail && (
              <>
                <p className="text-gray-300"> / </p>
                <Switcher 
                  items={agents}
                  initialSelectedItem="shorcut keys..."
                  searchPlaceholder="Search chatbot..."
                  listTitle="Agent"
                  createText="Create agent"
                />
              </>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-6">
          <Link to='/chatbotwidget'>
          <a href="#" className="text-sm text-gray-600 hover:text-black font-medium">
              Docs
            </a>
          </Link>
            <a href="#" className="text-sm text-gray-600 hover:text-black font-medium">
              Help
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-black font-medium">
              Changelog
            </a>
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=64&h=64"
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />
          </div>

          <button
            className="lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
           <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {!hideNavLinks && (
        <div className="flex justify-center border-b border-gray-200">
          <NavLinks links={navLinks} textSizeClass={isAgentDetail ? "text-sm" : undefined} />
        </div>
      )}

      <MobileMenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
};

export default Header;
