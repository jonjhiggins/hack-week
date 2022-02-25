import { axiosInstance } from '../services/axiosInstance';

export async function advanceUser() {
  const url = '/api/v1/user-story-state/progress-events';
  const advanceData: UserStoryStateProgressDto = {
    max_steps: 1,
    // pause_at_beats: true
  };
  return axiosInstance.post<UserStoryStateResponse>(url, advanceData);
}
