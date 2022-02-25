import { NextPageContext } from "next"

interface PageProps extends NextPageContext {
  profile: UserProfile
  userStoryState: UserStoryState
  userTimelineHooks: UserTimelineHookSerializer[]
  currentTimelineHook: UserTimelineHookSerializer
  userInteractables: UserInteractableSerializer[]
  currentUserInteractable: UserInteractableSerializer
}

interface FictioneersApiResponse<T, TT> {
  data: T,
  error: null | unknown,
  meta: TT
}

interface MetaSerializer {
  upserted_event_hooks: UserTimelineHookSerializer[] | null
  upserted_interactables: UserInteractableSerializer[] | null
  service_status: unknown
}

interface UserTimelineHookSerializer {
  timeline_event_id: string
  narrative_event_id: string
  event_type: NarrativeEventType
  hook: string
  delivered_at: string | null
  content_integrations: HookContentIntegrationSerializer[]
  title: string
  description: string | null
}

interface UserInteractableSerializer {
  id: string
  type: InteractableType
  state: InteractableState
  timeline_event_id: string
  narrative_event_id: string
  available_states: UserInteractableCommand[]
  content: HookContentIntegrationSerializer[] | null
  created_at: string
  last_modified_at: string
}

enum UserInteractableCommand {
  STARTED = 'STARTED',
  SKIPPED = 'SKIPPED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  CONSUMED = 'CONSUMED',
}

interface UserStoryState {
  current_event_id: string | null
  current_step: number | null
  current_beat: {
    id: string | null
    name: string | null
  }
  new_beat_available: {
    id: string | null
    name: string | null
  }
  waiting_for_condition_id: string | null
  end_of_timeline_reached: boolean
  datetime_guards_disabled: boolean
  pause_at_beats: boolean
  active_timeline_id: string
}

type UserStoryStateResponse = FictioneersApiResponse<UserStoryState, MetaSerializer | null>

interface UserStoryStateProgressDto {
  max_steps?: number,
  pause_at_beats?: true
}

type UserProfileResponse = FictioneersApiResponse<UserProfile, MetaSerializer | null>

interface UserProfile {
  id: string,
  email: string | null,
  display_name: string | null,
  narrative_state: unknown
}

type UserTimeLineHooksResponse = FictioneersApiResponse<UserTimelineHookSerializer[], MetaSerializer | null>



interface HookContentIntegrationSerializer {
  content_id: string
  content_type: string
  provider_id: string
}

type UserInteractablesResponse = FictioneersApiResponse<UserInteractableSerializer[] | null, MetaSerializer | null>



enum NarrativeEventType {
  SIMPLE = 'SIMPLE',
  ACTIVITY = 'ACTIVITY',
  CONSUMABLE = 'CONSUMABLE'
}


enum InteractableType {
  ACTIVITY = 'ACTIVITY',
  CONSUMABLE = 'CONSUMABLE'
}

enum InteractableState {
  INITIAL = 'INITIAL',
  AVAILABLE = 'AVAILABLE',
  STARTED = 'STARTED',
  SKIPPED = 'SKIPPED',
  REMOVED = 'REMOVED',
  PURGED = 'PURGED',
  UNAVAILABLE = 'UNAVAILABLE',
  COMPLETED = 'COMPLETED',
  CONSUMED = 'CONSUMED',
}
