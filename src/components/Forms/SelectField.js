import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

export default function SelectField({
  options,
  control,
  name,
  label,
  error,
  required,
  defaultValue,
  isSearchable,
  placeholder = "Select",
}) {
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

  return (
    <div className="form__group">
      {label && (
        <label>
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div className="form__select">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              value={options.find((option) => option.value === field.value)}
              onChange={(selectedOption) =>
                field.onChange(selectedOption.value)
              }
              isSearchable={isSearchable}
              styles={styles}
              placeholder={placeholder}
            />
          )}
        />
      </div>
      {error && <span className="form__error">{error}</span>}
    </div>
  );
}
