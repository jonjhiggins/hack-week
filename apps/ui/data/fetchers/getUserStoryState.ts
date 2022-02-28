import { axiosInstance } from "apps/ui/services/axiosInstance"
import { UserStoryStateResponse } from "../../types"

function getUserStoryState(url: string) {
  return axiosInstance.get<UserStoryStateResponse>(url)
}

export { getUserStoryState }
