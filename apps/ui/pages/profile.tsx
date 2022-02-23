import styled from '@emotion/styled';
import { axiosInstance } from '../services/axiosInstance';
import useSWR from 'swr'
import axios from 'axios';

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

const meFetcher = async (url) => {
  const meResponse = axiosInstance.get<MeResponse>(url)

  try {
    await meResponse
  } catch (e: unknown) {
    // Create user if they don't exist
    if (axios.isAxiosError(e)) {
      if (e.response.status === 403) {
        await createUser()
        return axiosInstance.get<MeResponse>(url)
      }
      return
    }
    throw new Error()
  }
  return meResponse
}

function loadData() {
  return useSWR(
    "/api/v1/users/me",
    meFetcher
  );
}

async function createUser() {
  const user = localStorage.getItem('user_uid')
  const uid = JSON.parse(user).uid
  await axiosInstance.post('/api/v1/users',
    {
      user_id: uid, published_timeline_id: "BQyAKcJvnCnEL0Vomv50",
      timezone: "Europe/London",
    })
}

export function Index() {
  const { data, error } = loadData()

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  const { data: { data: profile } } = data

  return (
    <StyledPage>
      <ul>
        <li>ID: {profile.id}</li>
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

