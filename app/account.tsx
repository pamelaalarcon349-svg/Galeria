import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ActivityIndicator, View } from 'react-native'
import { Session } from '@supabase/supabase-js'

import AccountView from '@/components/modules/auth/AcountView'
import { LoginView } from '@/components/modules/auth/LoginView'

export default function IndexScreen() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1️⃣ Al abrir la app obtenemos la sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false) // deja de cargar
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  // 3️⃣ Mientras verificamos la sesión → loader
  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />
  }


  if (!session) {
    return <LoginView />
  }

  return (
    <View>
      <AccountView key={session.user.id} session={session} />
    </View>
  )
}
