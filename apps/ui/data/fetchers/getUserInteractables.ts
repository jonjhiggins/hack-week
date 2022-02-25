import { axiosInstance } from "apps/ui/services/axiosInstance"

function getUserInteractables(url: string) {
  return axiosInstance.get<UserInteractablesResponse>(url)
}

export { getUserInteractables }
