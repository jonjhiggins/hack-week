import { axiosInstance } from "apps/ui/services/axiosInstance"

function getUserTimelineHooks(url: string) {
  return axiosInstance.get<UserTimeLineHooksResponse>(url)
}

export { getUserTimelineHooks }
