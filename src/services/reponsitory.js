
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

import { useMemo } from "react";

// Hàm bỏ dấu tiếng Việt
function removeVietnameseTones(str = "") {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

/**
 * Hook search
 * @param {Array} data - mảng dữ liệu gốc
 * @param {string} keyword - chuỗi search
 * @param {function} selector - hàm lấy text từ mỗi item (vd: item => item.name)
 */
export default function useSearch(data, keyword, selector) {
  return useMemo(() => {
    if (!keyword) return data;

    const searchText = removeVietnameseTones(keyword).toLowerCase();

    return data.filter((item) => {
      const text = removeVietnameseTones(selector(item) || "").toLowerCase();
      return text.includes(searchText);
    });
  }, [data, keyword, selector]);
}

