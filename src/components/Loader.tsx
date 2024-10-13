import React from "react";
import { jellyTriangle } from "ldrs";

jellyTriangle.register();

// Default values shown

export const Loader = () => {
  return (
    <l-jelly-triangle size="30" speed="1.75" color="#3a6ffb"></l-jelly-triangle>
  );
};
