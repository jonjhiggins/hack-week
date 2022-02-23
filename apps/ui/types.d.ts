

interface FictioneersApiResponse<T> {
  data: T,
  error: null | unknown,
  meta: null | unknown
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

type UserStoryStateResponse = FictioneersApiResponse<UserStoryState>

interface UserStoryStateProgressDto {
  max_steps?: number,
  pause_at_beats?: true
}

type MeResponse = FictioneersApiResponse<Me>

interface Me {
  id: string,
  email: string | null,
  display_name: string | null,
  narrative_state: unknown
}

type UserTimeLineHooksResponse = FictioneersApiResponse<UserTimeLineHooks>

interface UserTimeLineHooks {
  timeline_event_id: string
  narrative_event_id: string
  event_type: NarrativeEventType
  hook: string
  delivered_at: string | null
  content_integrations: [HookContentIntegrationSerializer]
  title: string
  description: string | null
}

interface HookContentIntegrationSerializer {
  content_id: string
  content_type: string
  provider_id: string
}

enum NarrativeEventType {
  SIMPLE = 'SIMPLE',
  ACTIVITY = 'ACTIVITY',
  CONSUMABLE = 'CONSUMABLE'
}
