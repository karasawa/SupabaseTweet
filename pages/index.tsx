import { useEffect } from 'react'
import type { NextPage } from 'next'
import { Auth } from '../components/Auth'
import { DashBoard } from '../components/DashBoard'
import { Layout } from '../components/Layout'
import useStore from '../store/index'
import { supabase } from '../utils/supabase'

const Home: NextPage = () => {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])
  return (
    <Layout title="SupabaseTweet">{!session ? <Auth /> : <DashBoard />}</Layout>
  )
}

export default Home
