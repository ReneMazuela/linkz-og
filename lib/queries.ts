import { supabase } from './supabase'

export async function fetchAvatarByUsername(username: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('avatar_url')
    .eq('username', username.toLowerCase())
    .single()

  if (error || !data?.avatar_url) return null

  return data.avatar_url
}