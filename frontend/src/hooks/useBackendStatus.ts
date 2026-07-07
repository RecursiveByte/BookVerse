import { useEffect, useRef, useState } from "react";

export type BackendStatus = "connecting" | "online" | "offline";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useBackendStatus() {
  const [status, setStatus] = useState<BackendStatus>("connecting");

  const statusRef = useRef<BackendStatus>("connecting");

  const updateStatus = (newStatus: BackendStatus) => {
    statusRef.current = newStatus;
    setStatus(newStatus);
  };

  useEffect(() => {
    const eventSource = new EventSource(`${BACKEND_URL}/events`);

    const timeout = setTimeout(() => {
      if (statusRef.current === "connecting") {
        updateStatus("offline");
      }
    }, 60_000);

    eventSource.onopen = () => {
      console.log("Connected to backend");
      clearTimeout(timeout);
      updateStatus("online");
    };

    eventSource.onerror = () => {
      if (statusRef.current === "connecting") {
        return;
      }

      console.log("Backend disconnected");
      updateStatus("offline");
    };

    return () => {
      clearTimeout(timeout);
      eventSource.close();
    };
  }, []);

  return {
    status,
    isOnline: status === "online",
    isConnecting: status === "connecting",
  };
}