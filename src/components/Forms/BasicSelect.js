import React from "react";
import Select from "react-select";

export const BasicSelect = ({
  placeholder,
  name,
  onChange,
  value,
  options = [],
  error,
  height = "30px",
}) => {
  const styles = {
    control: (styles) => ({
      ...styles,
      border: `1px solid ${error ? "var(--danger)" : "var(--stroke-alt)"}`,
      height: height,
      borderRadius: "8px",
      ":focus": {
        borderColor: error ? "var(--danger)" : "var(--primary)",
      },
      ":hover": {
        borderColor: error ? "var(--danger)" : "var(--primary)",
      },
    }),
  };
  return (
    <div className="form__select">
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        styles={styles}
        isSearchable={false}
      />
    </div>
  );
};
