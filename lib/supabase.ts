export async function fetchPublicProfile(username: string) {
    const encodedUsername = encodeURIComponent(`ilike.${username}`)
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/public_profiles?username=${encodedUsername}&select=username,displayname,avatar_url,background_url,cursor_url,description,location,badges,views,likes`
  
    try {
      const res = await fetch(url, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        cache: 'no-store',
      })
  
      if (!res.ok) {
        const errorBody = await res.text()
        console.error('❌ Supabase response error:', res.status, errorBody)
        throw new Error('Failed to fetch profile')
      }
  
      const json = await res.json()
  
      if (!json?.length) {
        console.warn('⚠️ Profile not found for username:', username)
        throw new Error('Profile not found')
      }
  
      return json[0]
    } catch (err) {
      console.error('❌ fetchPublicProfile failed:', err)
      throw err
    }
  }