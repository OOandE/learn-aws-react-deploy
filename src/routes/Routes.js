import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard.tsx";
import DashboardLayout from "../layouts/DashboardLayout.tsx";
import { Users } from "../pages/Users.tsx";
import Reports from "../pages/Reports.tsx";
import Medication from "../pages/Medication.tsx";
import { ServiceUserDetails } from "../pages/ServiceUserDetails.tsx";
import { Templates } from "../pages/Templates.tsx";
import { TemplatesDetails } from "../pages/TemplatesDetails.tsx";
import { UserTemplates } from "../pages/UserTemplates.tsx";
import { TemplateFormView } from "../pages/TemplateForm.tsx";
import { Settings } from "../pages/Settings.tsx";
import { TeamMemberDetails } from "../pages/TeamMemberDetails.tsx";
import Rotas from "../pages/Rota.js";

const SysRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <DashboardLayout pageTitle="Dashboard">
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            exact
            path="/users"
            element={
              <DashboardLayout pageTitle="Users">
                <Users />
              </DashboardLayout>
            }
          />
          <Route
            exact
            path="/service-user/:id"
            element={
              <DashboardLayout pageTitle="Service user">
                <ServiceUserDetails />
              </DashboardLayout>
            }
          />
          <Route
            exact
            path="/team-member/:id"
            element={
              <DashboardLayout pageTitle="Team member">
                <TeamMemberDetails />
              </DashboardLayout>
            }
          />
          <Route
            exact
            path="/users/:id/template"
            element={
              <DashboardLayout pageTitle="User Templates">
                <UserTemplates />
              </DashboardLayout>
            }
          />
          <Route
            exact
            path="/users/:id/template/form"
            element={
              <DashboardLayout pageTitle="Add Template">
                <TemplateFormView />
              </DashboardLayout>
            }
          />
          <Route
            exact
            path="/reports"
            element={
              <DashboardLayout pageTitle="Report">
                <Reports />
              </DashboardLayout>
            }
          />
          <Route
            exact
            path="/rotas"
            element={
              <DashboardLayout pageTitle="Rotas">
                <Rotas />
              </DashboardLayout>
            }
          />
          <Route
            exact
            path="/medication"
            element={
              <DashboardLayout pageTitle="Medication">
                <Medication />
              </DashboardLayout>
            }
          />
          <Route
            exact
            path="/templates"
            element={
              <DashboardLayout pageTitle="Templates">
                <Templates />
              </DashboardLayout>
            }
          />

          <Route
            exact
            path="/template/:id"
            element={
              <DashboardLayout pageTitle="Templates">
                <TemplatesDetails />
              </DashboardLayout>
            }
          />

          <Route
            exact
            path="/settings"
            element={
              <DashboardLayout pageTitle="Settings">
                <Settings />
              </DashboardLayout>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default SysRoutes;
