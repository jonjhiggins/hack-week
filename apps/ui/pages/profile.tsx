import styled from '@emotion/styled';
import { axiosInstance } from '../client/axiosInstance';
import useSWR from 'swr'

interface MeResponse {
  data: {
    id: string,
    email: string | null,
    display_name: string | null,
    narrative_state: unknown
  },
  error: null | unknown,
  meta: null | unknown
}

const fetcher = (url) => axiosInstance.get<MeResponse>(url)



export function Index() {
  const { data, error } = useSWR(
    "/api/v1/users/me",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  const { data: { data: profile } } = data

  return (
    <StyledPage>
      <ul>
        <li>Display name: {profile.display_name}</li>
        <li>Email: {profile.email}</li>
        <li>Narrative state: {JSON.stringify(profile.narrative_state)}</li>
      </ul>
    </StyledPage>
  );
}



const StyledPage = styled.div`
  .page {
  }
`;

export default Index;

