export interface MeResponse {
  data: {
    id: string,
    email: string | null,
    display_name: string | null,
    narrative_state: unknown
  },
  error: null | unknown,
  meta: null | unknown
}
