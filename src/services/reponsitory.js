import { data } from "react-router-dom";

export const getOjectById = (data,id) => {
    return data?.find(e => e.id == id) ;
}

export const truncateText = (text) => {
  if (!text) return "";
  return text.length > 30 ? text.slice(0, 30) + "..." : text;
}

