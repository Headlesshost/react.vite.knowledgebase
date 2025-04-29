import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Author, Guide, List, PagedResponse, SearchResult, Site } from "./types";
import { io } from "socket.io-client";

const socket = io("https://api.headlesshost.com");

function getTokenFromLocalStorage() {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
  return headers;
}

export function useContentSite(instanceId: string | undefined, isExpToken: boolean) {
  const headers = getTokenFromLocalStorage();
  const fetchData = async (): Promise<Site> => {
    const response = await fetch(`https://api.headlesshost.com/sites/${import.meta.env.VITE_CONTENT_SITEID}/instance/${instanceId}`, {
      headers,
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      if (response.status === 403) {
        throw new Error("Forbidden");
      }
      throw new Error("Content Site not found");
    }
    return response.json();
  };

  return useQuery<Site, Error>({
    queryKey: ["site", "instance", instanceId, isExpToken],
    queryFn: fetchData,
    enabled: !!instanceId,
  });
}

export function useAuthors(instanceId: string | undefined) {
  const headers = getTokenFromLocalStorage();
  const fetchData = async (): Promise<PagedResponse<Author>> => {
    const response = await fetch(`https://api.headlesshost.com/sites/${import.meta.env.VITE_CONTENT_SITEID}/instance/${instanceId}/catalogs/AUTHORS`, {
      headers,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  return useQuery<PagedResponse<Author>, Error>({
    queryKey: ["site", "instance", instanceId, "authors"],
    queryFn: fetchData,
    enabled: !!instanceId,
  });
}

export function useSearch(instanceId: string | null | undefined, term: string) {
  const headers = getTokenFromLocalStorage();
  const fetchData = async (): Promise<SearchResult[]> => {
    const response = await fetch(`https://api.headlesshost.com/sites/${import.meta.env.VITE_CONTENT_SITEID}/instance/${instanceId}/search?text=${encodeURIComponent(term)}`, {
      headers,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  return useQuery<SearchResult[], Error>({
    queryKey: ["site", "instance", instanceId, "search", term],
    queryFn: fetchData,
    enabled: !!instanceId && term?.length > 2,
  });
}

export function useContentSiteGuide(instanceId: string | undefined) {
  const headers = getTokenFromLocalStorage();
  const fetchData = async (): Promise<Guide> => {
    const response = await fetch(`https://api.headlesshost.com/sites/${import.meta.env.VITE_CONTENT_SITEID}/instance/${instanceId}/guide`, {
      headers,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  return useQuery<Guide, Error>({
    queryKey: ["site", "instance", instanceId, "guide"],
    queryFn: fetchData,
    enabled: !!instanceId,
  });
}

export function useSiteList() {
  const headers = getTokenFromLocalStorage();
  const fetchData = async (): Promise<List> => {
    const response = await fetch(`https://api.headlesshost.com/sites/${import.meta.env.VITE_CONTENT_SITEID}/list`, {
      headers,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  return useQuery<List, Error>({
    queryKey: ["site", "instance", "list"],
    queryFn: fetchData,
  });
}

export function useHotReload(instanceId: string | undefined) {
  const siteId = import.meta.env.VITE_CONTENT_SITEID;
  const queryClient = useQueryClient();

  useEffect(() => {
    function onStageUpdated(values: { instanceId: string | null }) {
      console.log("CMS Updated", values);
      if (values?.instanceId !== instanceId) {
        // Ignore updates from other instances
        return;
      }
      console.log("CMS Updated - clearing cache");
      queryClient.invalidateQueries({ queryKey: ["site"] });
    }
    function onPublish(values: unknown) {
      console.log("Site Published", values);
      queryClient.invalidateQueries({ queryKey: ["site"] });
    }
    socket.emit("ContentSite-Join", siteId);
    socket.on("StageUpdated", onStageUpdated);
    socket.on("Publish", onPublish);

    return () => {
      socket.emit("ContentSite-Leave", siteId);
      socket.off(siteId, onStageUpdated);
      socket.off(siteId, onPublish);
    };
  }, [siteId, instanceId, queryClient]);
}
