import styled from '@emotion/styled';
import { PageProps } from '../types';

export function UserTimelineHooks({ userTimelineHooks }: PageProps) {
  return (
    <StyledPage>
      {userTimelineHooks && userTimelineHooks.length ?
        <div>
          <ul>
            {userTimelineHooks.map((item, i) => <li key={i}>{JSON.stringify(item)}</li>)}
          </ul>
        </div> : <div>User has no timeline hooks</div>}
    </StyledPage>
  );
}



const StyledPage = styled.div`
  .page {
  }
`;

export default UserTimelineHooks;

