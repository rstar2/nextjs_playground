import { useState, useEffect } from "react";

/**
 * As per https://nextjs.org/docs/messages/react-hydration-error
 */
export default function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  // useEffect only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
