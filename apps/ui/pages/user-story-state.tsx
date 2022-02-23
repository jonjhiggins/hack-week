import styled from '@emotion/styled';
import { axiosInstance } from '../services/axiosInstance';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

interface UserStoryState {
  current_event_id: string | null
  current_step: number | null
  current_beat: {
    id: string | null
    name: string | null
  }
  new_beat_available: {
    id: string | null
    name: string | null
  }
  waiting_for_condition_id: string | null
  end_of_timeline_reached: boolean
  datetime_guards_disabled: boolean
  pause_at_beats: boolean
  active_timeline_id: string
}

interface UserStoryStateResponse {
  data: UserStoryState,
  error: null | unknown,
  meta: null | unknown
}

interface UserStoryStateProgressDto {
  max_steps?: number,
  pause_at_beats?: true
}

const fetcher = (url) => axiosInstance.get<UserStoryStateResponse>(url)

export function UserStoryState() {
  const [storyState, setStoryState] = useState<UserStoryState>(null)

  async function advance() {
    const url = '/api/v1/user-story-state/progress-events'
    const advanceData: UserStoryStateProgressDto = {
      max_steps: 1,
      // pause_at_beats: true
    }
    const userStoryStateResponse = await axiosInstance.post<UserStoryStateResponse>(url, advanceData)
    setStoryState(userStoryStateResponse.data.data)
  }

  const { data, error } = useSWR(
    "/api/v1/user-story-state",
    fetcher
  );

  useEffect(() => { if (data && data.data.data) setStoryState(data.data.data); }, [data])

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";


  return (
    <StyledPage>
      {storyState ?
        <ul>
          {Object.keys(storyState).map(k => <li key={k}>{k}: {storyState[k] ? JSON.stringify(storyState[k]) : 'null'}</li>)}
        </ul> : null}
      <button onClick={advance}>Advance</button>
    </StyledPage>
  );
}



const StyledPage = styled.div`
  .page {
  }
`;

export default UserStoryState;

