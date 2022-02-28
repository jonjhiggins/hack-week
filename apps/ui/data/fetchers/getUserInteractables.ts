import { axiosInstance } from "apps/ui/services/axiosInstance"
import { UserInteractablesResponse } from "../../types"

function getUserInteractables(url: string) {
  return axiosInstance.get<UserInteractablesResponse>(url)
}

export { getUserInteractables }
