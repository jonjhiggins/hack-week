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

interface UserStoryStateResponse {
  data: UserStoryState,
  error: null | unknown,
  meta: null | unknown
}

interface UserStoryStateProgressDto {
  max_steps?: number,
  pause_at_beats?: true
}

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
