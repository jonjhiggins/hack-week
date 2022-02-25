import { AppProps } from 'next/app';
import Head from 'next/head';
import { createOrRetrieveUser } from '../services/createOrRetrieveUser';
import { NavBar } from '../components/NavBar';
import './styles.css';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../services/axiosInstance';
import { useUserTimelineHooks } from '../data/useUserTimelineHooks';
import { useUserStoryState } from '../data/useUserStoryState';
import { advanceUser } from '../data/advanceUser';

function CustomApp({ Component, pageProps }: AppProps) {
  const [userTimelineHooks, setUserTimelineHooks] = useState<UserTimeLineHooks[] | null>(null)
  const [userStoryState, setUserStoryState] = useState<UserStoryState | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [currentEventHook, setCurrentEventHook] = useState<UserTimelineHookSerializer | null>(null)

  const advance = async () => {
    try {
      const userStoryStateResponse = await advanceUser();
      if (userStoryStateResponse.data.meta.upserted_event_hooks.length) {
        setCurrentEventHook(userStoryStateResponse.data.meta.upserted_event_hooks[0])
        setUserTimelineHooks(userStoryStateResponse.data.meta.upserted_event_hooks)
      }
      setUserStoryState(userStoryStateResponse.data.data)

      setIsError(null)
    } catch (e) {
      setIsError(`Could not advance user ${e.message}`)
    }
  }

  const restart = async () => {
    try {
      await axiosInstance.delete('api/v1/users/me')
      setIsError(null)
      setIsLoading(false)
      setUserProfile(null)
      setUserStoryState(null)
      setUserTimelineHooks(null)
      window.location.reload()
    } catch (e) {
      setIsError(`Could not delete user ${e.message}`)
    }
  }

  // Get user
  const { data: userProfileResponse, error: userProfileError } = createOrRetrieveUser()

  // Get timeline hooks
  const {
    error: userTimelineHooksError,
    response: userTimelineHooksResponse,
  } = useUserTimelineHooks(!!userProfile)

  // Get user story state
  const {
    error: userStoryStateError,
    response: userStoryStateResponse,
  } = useUserStoryState(!!userProfile)

  useEffect(() => {
    if (userProfileError) {
      setIsError(`Could not load user profile ${userProfileError}`)
      setIsLoading(false)
      return
    }
    if (userProfileResponse && userProfileResponse.data.data) {
      setUserProfile(userProfileResponse.data.data)
      setIsError(null)
      setIsLoading(false)
    }
  }, [
    userProfileResponse, userProfileError
  ])

  useEffect(() => {
    if (userTimelineHooksError) {
      setIsError(`Could not load user timeline hooks ${userTimelineHooksError}`)
      setIsLoading(false)
      return
    }
    if (userTimelineHooksResponse && userTimelineHooksResponse.data.data && userTimelineHooksResponse.data.data.length) {
      const userTimelineHooksResponseData = userTimelineHooksResponse.data.data
      setUserTimelineHooks(userTimelineHooksResponseData)
      // set latest event hook to be current one
      setCurrentEventHook(userTimelineHooksResponseData[userTimelineHooksResponseData.length - 1])
      setIsError(null)
      setIsLoading(false)
    }
  }, [userTimelineHooksResponse, userTimelineHooksError])

  useEffect(() => {
    if (userStoryStateError) {
      setIsError(`Could not load user story state ${userStoryStateError}`)
      setIsLoading(false)
      return
    }
    if (userStoryStateResponse && userStoryStateResponse.data.data) {
      setUserStoryState(userStoryStateResponse.data.data)
      setIsError(null)
      setIsLoading(false)
    }
  }, [userStoryStateResponse, userStoryStateError])

  return (
    <>
      <Head>
        <title>DCI Hood</title>
      </Head>
      <NavBar navLinks={[
        { name: 'Home', href: '/' },
        { name: 'Profile', href: '/profile' },
        { name: 'User Story State', href: '/user-story-state' },
        { name: 'User Timeline Hooks', href: '/user-timeline-hooks' }
      ]} buttons={[
        <button onClick={advance}>Advance</button>,
        <button onClick={restart}>Restart</button>
      ]} />


      <main className="app">
        {isError ? <div>Error: {isError}</div> : null}
        {!isLoading ? <Component {...pageProps} profile={userProfile} currentEventHook={currentEventHook} userStoryState={userStoryState} userTimelineHooks={userTimelineHooks} /> : <div>Loading...</div>}

      </main>
    </>
  );

}

export default CustomApp;
