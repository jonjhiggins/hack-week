import { axiosInstance } from '../services/axiosInstance';
import { UserStoryStateProgressDto, UserStoryStateResponse } from '../types';

export async function advanceUser() {
  const url = '/user-story-state/progress-events';
  const advanceData: UserStoryStateProgressDto = {
    max_steps: 1,
    // pause_at_beats: true
  };
  return axiosInstance.post<UserStoryStateResponse>(url, advanceData);
}
