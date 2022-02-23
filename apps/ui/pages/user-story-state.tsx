import styled from '@emotion/styled';
import { axiosInstance } from '../services/axiosInstance';
import useSWR from 'swr';
import { useEffect, useState } from 'react';


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
        <div>
        <ul>
          {Object.keys(storyState).map(k => <li key={k}>{k}: {storyState[k] ? JSON.stringify(storyState[k]) : 'null'}</li>)}
          </ul>
          <button onClick={advance}>Advance</button>
        </div> : null}

    </StyledPage>
  );
}



const StyledPage = styled.div`
  .page {
  }
`;

export default UserStoryState;

