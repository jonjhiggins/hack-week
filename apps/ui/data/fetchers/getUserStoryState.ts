import { axiosInstance } from "apps/ui/services/axiosInstance"

function getUserStoryState(url: string) {
  return axiosInstance.get<UserStoryStateResponse>(url)
}

export { getUserStoryState }
