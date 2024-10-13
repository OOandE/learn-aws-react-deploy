import React from "react";
import Tabs from "../components/Tabs.js";
import { ServiceUsers } from "../components/users/ServiceUsers.js";
import { TeamUsers } from "../components/users/TeamUsers.js";

export const Users = () => {
  const tabItems = [
    {
      label: "Service users",
      content: <ServiceUsers />,
    },
    {
      label: "Staff",
      content: <TeamUsers />,
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
