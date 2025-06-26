import { NavLink, useLocation } from "react-router-dom";
import type { NavLinksProps } from "../types/types";
import { defaultLinks } from "../constants/Data";


const NavLinks = ({ links = defaultLinks, activePath, textSizeClass = "text-sm" }: NavLinksProps) => {
  const location = useLocation();
  const pathname = activePath || location.pathname;
  return (
    <div className="overflow-x-auto ps-16 md:ps-0  w-full">
      <nav className="flex items-center gap-8 flex-1 justify-center px-4">
        {links.map((link) => {
          const isActive = link.customActive ? link.customActive(pathname) : pathname === link.to;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive: navIsActive }) =>
                `${textSizeClass} font-normal py-1 transition whitespace-nowrap ${link.customActive ? (isActive ? "border-b-2 border-black text-black " : "text-gray-500 hover:text-black") :
                  (isActive || navIsActive ? "border-b-2 border-black text-black " : "text-gray-500 hover:text-black")
                }`
              }
            >
              {link.name}
            </NavLink>
          );
        })}
      </nav>
    </div>

  );
};

export default NavLinks; 