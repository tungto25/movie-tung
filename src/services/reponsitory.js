
export const getOjectById = (arr, key) => {
  if (!arr || !key) return null;
  return arr.find(e =>
    e.id === key ||
    e.name?.toLowerCase() === key.toLowerCase() ||
    e.title?.toLowerCase() === key.toLowerCase()
  );
};

export const truncateText = (text) => {
  if (!text) return "";
  return text.length > 40 ? text.slice(0, 70) + "..." : text;
}

import { useState, useMemo } from "react";

// Hàm bỏ dấu tiếng Việt
export function removeVietnameseTones(str = "") {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

/**
 * Hook search
 */
export function useSearch(data, keyword, selector) {
  return useMemo(() => {
    if (!keyword) return data;

    const searchText = removeVietnameseTones(keyword).toLowerCase();

    return data.filter((item) => {
      const text = removeVietnameseTones(selector(item) || "").toLowerCase();
      return text.includes(searchText);
    });
  }, [data, keyword, selector]);
}

/**
 * Hook sort
 */
export function useSort(data, options = {}) {
  const [sortConfig, setSortConfig] = useState({
    key: options.initialKey || null,
    direction: options.initialDirection || "asc",
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const toggleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  return { sortedData, sortConfig, toggleSort };
}

export const filterById = (data, id, key = "id") => {
  return data.filter(item => item[key] === id);
};