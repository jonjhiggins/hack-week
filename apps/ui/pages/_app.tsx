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
import { css } from '@emotion/react';
import { useUserInteractables } from '../data/useUserInteractables';

function CustomApp({ Component, pageProps }: AppProps) {
  const [userTimelineHooks, setUserTimelineHooks] = useState<UserTimelineHookSerializer[] | null>(null)
  const [userInteractables, setUserInteractables] = useState<UserInteractableSerializer[] | null>(null)
  const [userStoryState, setUserStoryState] = useState<UserStoryState | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [currentTimelineHook, setCurrentTimelineHook] = useState<UserTimelineHookSerializer | null>(null)
  const [currentUserInteractable, setCurrentUserInteractable] = useState<UserInteractableSerializer | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<string | null>(null)

  const advance = async () => {
    try {
      const userStoryStateResponse = await advanceUser();
      if (userStoryStateResponse.data.meta.upserted_event_hooks.length) {
        setCurrentTimelineHook(userStoryStateResponse.data.meta.upserted_event_hooks[0])
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

  // Get user interactables
  const {
    error: userInteractablesError,
    response: userInteractablesResponse,
  } = useUserInteractables(!!userProfile)

  useEffect(() => {
    if (userInteractablesError) {
      setIsError(`Could not load user story state ${userStoryStateError}`)
      setIsLoading(false)
      return
    }
    if (userInteractablesResponse && userInteractablesResponse.data.data) {
      const userInteractablesResponseData = userInteractablesResponse.data.data
      setUserInteractables(userInteractablesResponseData)
      // set latest event hook to be current one
      setCurrentUserInteractable(userInteractablesResponseData[userInteractablesResponseData.length - 1])
      setIsError(null)
      setIsLoading(false)
    }
  }, [
    userInteractablesResponse
  ])

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
      setCurrentTimelineHook(userTimelineHooksResponseData[userTimelineHooksResponseData.length - 1])
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
        { name: 'User Timeline Hooks', href: '/user-timeline-hooks' },
        { name: 'User Interactables', href: '/user-interactables' }
      ]} buttons={[
        <button onClick={advance}>Advance</button>,
        <button onClick={restart}>Restart</button>
      ]} />

      <main className="app" css={css(`height: 100vh`)}>
        {isError ? <div>Error: {isError}</div> : null}
        {!isLoading ? <Component
          {...pageProps}
          profile={userProfile}
          userStoryState={userStoryState}
          userTimelineHooks={userTimelineHooks}
          currentTimelineHook={currentTimelineHook}
          userInteractables={userInteractables}
          currentUserInteractable={setCurrentUserInteractable}
        /> : <div>Loading...</div>}

      </main>
    </>
  );

}

export default CustomApp;
