import styled from '@emotion/styled';

export function UserStoryState({ userStoryState }) {
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

