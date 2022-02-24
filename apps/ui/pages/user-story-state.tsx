import styled from '@emotion/styled';
import { axiosInstance } from '../services/axiosInstance';

export function UserStoryState({ userStoryState }) {
  console.log(userStoryState)
  return (
    <StyledPage>
      {userStoryState ?
        <div>
        <ul>
            {Object.keys(userStoryState).map(k => <li key={k}>{k}: {userStoryState[k] ? JSON.stringify(userStoryState[k]) : 'null'}</li>)}
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

