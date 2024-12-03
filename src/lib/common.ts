import { List } from "./types";
import { useEffect, useState } from "react";

export function resolveInstance(data: List | undefined, instanceId: string | undefined | null): string | undefined {
  if (!data) return undefined;
  const isStaging = window?.location?.hostname?.includes("stage");

  const allIds = [...data.stagingSites, ...data.publishedSites].map((s) => s.id);
  const headInstanceId = data.stagingSites?.find((s) => s.isHead)?.id;
  const productionInstanceId = data.publishedSites.find((s) => s.isProduction)?.id;

  return instanceId && allIds.includes(instanceId) ? instanceId : isStaging || !productionInstanceId ? headInstanceId : productionInstanceId;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export function dateToYMD(dateStr: string | undefined | Date) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const strArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const d = date.getDate();
  const m = strArray[date.getMonth()];
  const y = date.getFullYear();
  return `${m} ${d <= 9 ? "0" + d : d}, ${y}`;
}

export function trimCenter(inputString: string, maxLength: number = 100) {
  if (!inputString) return "";
  // Ensure the input string is longer than the desired maximum length
  if (inputString.length <= maxLength) {
    return inputString;
  }

  // Calculate the length of the start and end portions
  const startLength = Math.ceil((maxLength - 1) / 2); // Ensure it's an integer
  const endLength = Math.floor((maxLength - 1) / 2);

  // Extract the start and end portions of the string
  const startPortion = inputString.substring(0, startLength);
  const endPortion = inputString.substring(inputString.length - endLength);

  // Concatenate the start and end portions with an ellipsis in the center
  const resultString = startPortion + endPortion;

  return resultString;
}

export function isTokenExpired() {
  const token = localStorage.getItem("token");
  if (!token) {
    return true;
  }
  try {
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) {
      return true;
    }
    const decodedPayload = JSON.parse(atob(payload));
    if (!decodedPayload.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedPayload.exp < currentTime;
  } catch {
    return true; // Treat as expired if there's any error
  }
}
