import React, { useState } from "react";
import Select from "react-select";

const TimeSelect = ({ onTimeChange, error, label, required }) => {
  const styles = {
    control: (styles) => ({
      ...styles,
      border: `1px solid ${error ? "var(--danger)" : "var(--stroke-alt)"}`,
      height: "48px",
      borderRadius: "8px",
      ":focus": {
        borderColor: error ? "var(--danger)" : "var(--primary)",
      },
      ":hover": {
        borderColor: error ? "var(--danger)" : "var(--primary)",
      },
    }),
  };
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");

  // Handle changes in hours and minutes and trigger the callback
  const handleTimeChange = (newHours, newMinutes) => {
    if (!newHours.value || !newMinutes.value) return;
    const formattedTime = `${newHours.value}:${newMinutes.value}`;
    onTimeChange(formattedTime);
  };

  // Generate arrays of hours and minutes for the dropdowns
  const generateOptions = (limit) => {
    return Array.from({ length: limit }, (_, index) => {
      const value = index < 10 ? `0${index}` : `${index}`;
      return { value, label: value };
    });
  };

  return (
    <div className="form__group">
      {label && (
        <label>
          {label}
          {required && <span>*</span>}
        </label>
      )}
      <div className="form__group-time">
        <div className="form__select">
          <Select
            options={generateOptions(24)}
            value={hours}
            onChange={(e) => {
              setHours(e);
              handleTimeChange(e, minutes);
            }}
            styles={styles}
            isSearchable={false}
          />
        </div>

        <span> : </span>
        <div className="form__select">
          <Select
            options={generateOptions(60)}
            value={minutes}
            onChange={(e) => {
              setMinutes(e);
              handleTimeChange(hours, e);
            }}
            styles={styles}
            isSearchable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeSelect;
