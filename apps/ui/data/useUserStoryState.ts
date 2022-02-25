import useSWR from "swr";
import { getUserStoryState } from "./fetchers/getUserStoryState";

function useUserStoryState(shouldFetch: boolean) {
  const { data, error } = useSWR(
    shouldFetch ? "/api/v1/user-story-state" : null,
    (url: string) => getUserStoryState(url)
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    response: data,
  };
}

export { useUserStoryState }
