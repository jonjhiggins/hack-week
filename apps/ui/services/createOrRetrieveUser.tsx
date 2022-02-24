import axios from 'axios';
import useSWR from 'swr';
import { axiosInstance } from './axiosInstance';

async function createUser() {
  const user = localStorage.getItem('user_uid');
  const uid = JSON.parse(user).uid;
  await axiosInstance.post('/api/v1/users',
    {
      user_id: uid, published_timeline_id: process.env.NEXT_PUBLIC_FICTIONEERS_TIMELINE_ID,
      timezone: "Europe/London",
    });
}

const userProfileFetcher = async (url) => {
  const userProfileResponse = axiosInstance.get<UserProfileResponse>(url)

  try {
    await userProfileResponse
  } catch (e: unknown) {
    // Create user if they don't exist
    if (axios.isAxiosError(e)) {
      if (e.response.status === 403) {
        await createUser()
        return axiosInstance.get<UserProfileResponse>(url)
      }
      return
    }
    throw new Error()
  }
  return userProfileResponse
}

function createOrRetrieveUser() {
  return useSWR(
    "/api/v1/users/me",
    userProfileFetcher
  );
}

export { createOrRetrieveUser }
