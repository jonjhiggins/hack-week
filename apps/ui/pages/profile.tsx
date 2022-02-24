import styled from '@emotion/styled';

export function Profile({ profile }) {
  return (
    <StyledPage>
      {profile ?
      <ul>
        <li>ID: {profile.id}</li>
        <li>Display name: {profile.display_name}</li>
        <li>Email: {profile.email}</li>
        <li>Narrative state: {JSON.stringify(profile.narrative_state)}</li>
        </ul> : <div>Could not load user profile</div>}
    </StyledPage>
  );
}



const StyledPage = styled.div`
  .page {
  }
`;

export default Profile;

