import React, { useEffect, useState } from "react";
import {
  format,
  subDays,
  subMonths,
  subYears,
  startOfQuarter,
  endOfQuarter,
} from "date-fns";
import { BasicSelect } from "./BasicSelect";
import { BasicDatePicker } from "./BasicDatePicker";

const DateFilter = ({ onFilterChange }) => {
  const [selectedRange, setSelectedRange] = useState("");
  const [customRange, setCustomRange] = useState({
    startDate: "",
    endDate: "",
  });

  const dateOptions = [
    { value: "lastDay", label: "Last Day" },
    { value: "last15Days", label: "Last 15 Days" },
    { value: "last30Days", label: "Last 30 Days" },
    { value: "lastQuarter", label: "Last Quarter" },
    { value: "lastYear", label: "Last Year" },
    { value: "custom", label: "Custom Range" },
  ];

  useEffect(() => {
    if (selectedRange === "custom") {
      setCustomRange({
        startDate: "",
        endDate: "",
      });
    }
  }, [selectedRange]);

  // Predefined ranges logic
  const getRange = (range) => {
    const today = new Date();
    let startDate, endDate;

    switch (range) {
      case "lastDay":
        startDate = subDays(today, 1);
        endDate = today;
        break;
      case "last15Days":
        startDate = subDays(today, 15);
        endDate = today;
        break;
      case "last30Days":
        startDate = subDays(today, 30);
        endDate = today;
        break;
      case "lastQuarter":
        startDate = startOfQuarter(subMonths(today, 3));
        endDate = endOfQuarter(subMonths(today, 3));
        break;
      case "lastYear":
        startDate = subYears(today, 1);
        endDate = today;
        break;
      default:
        return;
    }

    return { startDate, endDate };
  };

  // Handle dropdown change
  const handleRangeChange = (e) => {
    const selectedValue = e.value;
    setSelectedRange(selectedValue);

    if (selectedValue === "custom") {
      // Do nothing for custom; wait for user input
      onFilterChange(null);
    } else {
      const { startDate, endDate } = getRange(selectedValue);
      onFilterChange({ startDate, endDate });
    }
  };

  // Handle custom date range change
  const handleCustomRangeChange = (e, name) => {
    setCustomRange((prevState) => ({ ...prevState, [name]: e }));
  };

  useEffect(() => {
    if (customRange.startDate !== "" && customRange.endDate !== "") {
      const { startDate, endDate } = customRange;
      onFilterChange({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    }
  }, [customRange]);

  return (
    <div>
      <div>
        <BasicSelect
          placeholder="Filter by date"
          options={dateOptions}
          name="filterDate"
          onChange={handleRangeChange}
        />

        {selectedRange === "custom" && (
          <div className="d-flex mt-8">
            <BasicDatePicker
              selectsStart
              value={customRange.startDate}
              onChange={(e) => handleCustomRangeChange(e, "startDate")}
              placeholder="Select start date"
              startDate={customRange.startDate}
              endDate={customRange.endDate}
            />
            <BasicDatePicker
              selectsEnd
              value={customRange.endDate}
              onChange={(e) => handleCustomRangeChange(e, "endDate")}
              placeholder="Select end date"
              startDate={customRange.startDate}
              endDate={customRange.endDate}
              minDate={customRange.startDate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateFilter;
