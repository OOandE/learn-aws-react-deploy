import React from "react";
import { NavLink } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { TbReport } from "react-icons/tb";
import { TbTemplate } from "react-icons/tb";
import { GrSchedules } from "react-icons/gr";
import { TbReportMedical } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";

interface SidebarItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

export default function Sidebar() {
  const sidebarList: SidebarItem[] = [
    {
      name: "Dashboard",
      path: "/",
      icon: <TbLayoutDashboard className="sidebar__icon" />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <LuUsers className="sidebar__icon" />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <TbReport className="sidebar__icon" />,
    },
    {
      name: "Templates",
      path: "/templates",
      icon: <TbTemplate className="sidebar__icon" />,
    },
    {
      name: "Shifts",
      path: "/shifts",
      icon: <GrSchedules className="sidebar__icon" />,
    },
    {
      name: "Medication",
      path: "/medication",
      icon: <TbReportMedical className="sidebar__icon" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FiSettings className="sidebar__icon" />,
    },
  ];
  return (
    <nav className="sidebar">
      <ul className="sidebar__list">
        {sidebarList.map((list: SidebarItem) => (
          <li className="sidebar__item" key={list.name}>
            <NavLink to={list.path}>
              {list.icon}
              {list.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
