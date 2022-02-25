import useSWR from "swr";
import { getUserInteractables } from "./fetchers/getUserInteractables";

function useUserInteractables(shouldFetch: boolean) {
  const { data, error } = useSWR(
    shouldFetch ? "/api/v1/user-interactables" : null,
    (url: string) => getUserInteractables(url)
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    response: data,
  };
}

export { useUserInteractables }
