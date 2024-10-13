import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../utils/functions";

const Tabs = ({
  tabs = [], // Expecting an array of { label: 'string', content: 'ReactNode' }
  defaultActive = 0, // Which tab should be active by default (zero-indexed)
  primaryColor = "var(--primary)",
  grayColor = "var(--gray)",
  onTabChange, // Optional callback function when tab changes
}) => {
  const [activeTab, setActiveTab] = useState(defaultActive);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);
  const navigate = useNavigate();
  const query = useQuery();
  const index = query.get("tabIndex");

  useEffect(() => {
    if (index) {
      setActiveTab(Number(index));
    }
  }, [index]);

  useEffect(() => {
    // Update indicator style based on active tab
    if (tabsRef.current[activeTab]) {
      const activeTabElement = tabsRef.current[activeTab];
      setIndicatorStyle({
        width: activeTabElement.offsetWidth,
        left: activeTabElement.offsetLeft,
      });
    }
  }, [activeTab]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    navigate(
      {
        search: `?tabIndex=${index}`,
      },
      { replace: true }
    );
    if (onTabChange) onTabChange(index);
  };

  return (
    <>
      <div className="tabs-container">
        <div className="tabs">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab ${activeTab === index ? "active" : ""}`}
              style={{
                color: activeTab === index ? primaryColor : grayColor,
                fontWeight: activeTab === index ? "bold" : "normal",
              }}
              onClick={() => handleTabClick(index)}
              ref={(el) => (tabsRef.current[index] = el)} // Store the ref of each tab
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="tab-indicator">
          <div
            className="indicator"
            style={{
              width: `${indicatorStyle.width}px`,
              left: `${indicatorStyle.left}px`,
              backgroundColor: primaryColor,
            }}
          ></div>
        </div>
      </div>
      <div className="tab-content">
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </>
  );
};

export default Tabs;
