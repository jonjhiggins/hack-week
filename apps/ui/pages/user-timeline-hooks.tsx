import styled from '@emotion/styled';
import { axiosInstance } from '../services/axiosInstance';
import useSWR from 'swr';


const fetcher = (url) => axiosInstance.get<UserTimeLineHooksResponse>(url)

export function UserTimelineHooks() {
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
            {timelineState.map((item, i) => <li key={i}>{JSON.stringify(item)}</li>)}
          </ul>
        </div> : null}
    </StyledPage>
  );
}



const StyledPage = styled.div`
  .page {
  }
`;

export default UserTimelineHooks;

