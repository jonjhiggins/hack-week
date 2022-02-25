import useSWR from "swr";
import { getUserTimelineHooks } from "./fetchers/getUserTimelineHooks";

function useUserTimelineHooks(shouldFetch: boolean) {
  const { data, error } = useSWR(shouldFetch ?
    "/api/v1/user-timeline-hooks" : null,
    (url: string) => getUserTimelineHooks(url)
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    response: data,
  };
}

export { useUserTimelineHooks }
