import styled from '@emotion/styled';
import { PageProps } from '../types';

export function UserInteractables({ userInteractables }: PageProps) {

  return (
    <StyledPage>
      {userInteractables && userInteractables.length ?
        <div>
          <ul>
            {userInteractables.map((item, i) => <li key={i}>{JSON.stringify(item)}</li>)}
          </ul>
        </div> : <div>User has no interactables</div>}
    </StyledPage>
  );
}



const StyledPage = styled.div`
`;

export default UserInteractables;

