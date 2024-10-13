import React from "react";
import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";
import { GoBack } from "../components/GoBack.js";
import { useLocation } from "react-router-dom";

export default function DashboardLayout({ pageTitle, children }) {
  const location = useLocation();

  const isNestedRoute = () => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment);
    return pathSegments.length > 1;
  };

  return (
    <>
      <Header pageTitle={pageTitle} />
      <div>
        <Sidebar />
      </div>

      <main className="layout__body">
        {isNestedRoute() && <GoBack />}
        {children}
      </main>
    </>
  );
}
