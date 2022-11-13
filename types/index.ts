export type Profile = {
  id: string | null
  created_at: string
  updated_at: string
  username: string
  avatar_url: string
  favorites: string
}

export type EditedProfile = {
  username: string
  avatar_url: string
  favorites: string
}
