import { format } from "date-fns";
import React from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export const initials = (firstName, lastName) => {
  return `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
};

export const fmtCurrency = (value, currency) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currencyDisplay: "symbol",
    currency: currency ? currency : "NGN",
  });
  return formatter.format(Number(value));
};

export function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}

export const dateFormat = (date, type) => {
  if (!date) return "--";
  return format(new Date(date), type);
};

export const formatTime = (time) => {
  if (!time) return "--";
  const date = new Date();
  const [hours, minutes] = time.split(":");
  date.setHours(parseInt(hours), parseInt(minutes), 0);

  return format(date, "HH:mm");
};

export const dateDefaultValue = (date) => {
  return date ? new Date(date).toISOString().split("T")[0] : "";
};

export function capitalize(text) {
  if (!text) return;
  return text?.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function capitalizeFirstLetterSentence(sentence) {
  if (!sentence) return;
  return sentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
}

export function truncateString(str, limit) {
  if (str.length > limit) {
    return str.substring(0, limit) + "...";
  } else {
    return str;
  }
}

export const phoneRegExp =
  /((^090)([0-9]))|((^070)([0-9]))|((^080)([0-9]))|((^091)([0-9]))|((^071)([0-9]))|((^081)([0-9]))(\d{7})/;

export function fullName(firstname, lastname) {
  return `${firstname} ${lastname}`;
}

export const copyText = async (id) => {
  const text = document.getElementById(id);
  await navigator.clipboard.writeText(text.innerText);
  toast.success("Text copied!");
};

export const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export function daysLeft(targetDate) {
  // Convert the target date string to a Date object
  const targetDateTime = new Date(targetDate);

  // Get the current date
  const currentDate = new Date();

  // Convert both dates to UTC to ensure consistency
  const utcCurrentDate = Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const utcTargetDate = Date.UTC(
    targetDateTime.getFullYear(),
    targetDateTime.getMonth(),
    targetDateTime.getDate()
  );

  // Calculate the difference in milliseconds
  const timeDifference = utcTargetDate - utcCurrentDate;

  // Convert the difference to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

export const arrangeNamesAlphabetically = (data) => {
  const sortedData = [...data].sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  return sortedData;
};
export const limitString = (str, limit) => {
  return str.length > limit ? str.substring(0, limit) + "..." : str;
};

export const returnDuration = (duration) => {
  switch (duration.toLowerCase()) {
    case "monthly":
      return "month";
    case "quarterly":
      return "quarter";
    case "annually":
      return "year";
    default:
      return "month";
  }
};

export const truncate = (text, length, clamp) => {
  clamp = clamp || "...";
  const node = document.createElement("div");
  node.innerHTML = text;
  const content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};
