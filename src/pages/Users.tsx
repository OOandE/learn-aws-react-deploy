import React from "react";
import Tabs from "../components/Tabs.js";
import { ServiceUsers } from "../components/users/ServiceUsers.js";
import { StaffMembers } from "../components/users/StaffMembers.js";

export const Users = () => {
  const tabItems = [
    {
      label: "Service users",
      content: <ServiceUsers />,
    },
    {
      label: "Staff",
      content: <StaffMembers />,
    },
  ];
  return (
    <div>
      <Tabs
        tabs={tabItems}
        defaultActive={0}
        primaryColor="var(--primary)" // Optional, defaults to 'var(--primary)'
        grayColor="var(--gray)" // Optional, defaults to 'var(--gray)'
      />
    </div>
  );
};
