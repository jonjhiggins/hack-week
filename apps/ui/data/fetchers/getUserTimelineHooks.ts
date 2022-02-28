import { axiosInstance } from "apps/ui/services/axiosInstance"
import { UserTimeLineHooksResponse } from "../../types"

function getUserTimelineHooks(url: string) {
  return axiosInstance.get<UserTimeLineHooksResponse>(url)
}

export { getUserTimelineHooks }
