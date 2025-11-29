import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { StyleSheet, View, } from 'react-native'
import{ Session } from '@supabase/supabase-js'
import { HomeView } from '@/components/modules/HomeView'
import { LoginView } from '@/components/modules/auth/LoginView'


export default function IndexScreen() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

   supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

}, [])

return(
  <View>
    {session && session.user ? <HomeView key={session.user.id} /> : <LoginView />}
  </View>
)
  }

