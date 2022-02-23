import styled from '@emotion/styled';
import { axiosInstance } from '../services/axiosInstance';
import useSWR from 'swr';


const fetcher = (url) => axiosInstance.get<UserTimeLineHooksResponse>(url)

export function UserStoryState() {
  const { data, error } = useSWR(
    "/api/v1/user-timeline-hooks",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  const { data: { data: timelineState } } = data
  return (
    <StyledPage>
      {timelineState ?
        <div>
          <ul>
            {Object.keys(timelineState).map(k => <li key={k}>{timelineState[k] ? JSON.stringify(timelineState[k]) : 'null'}</li>)}
          </ul>
        </div> : null}
    </StyledPage>
  );
}



const StyledPage = styled.div`
  .page {
  }
`;

export default UserStoryState;

