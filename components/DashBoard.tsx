import { LogoutIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import useStore from '../store'

export const DashBoard = () => {
  const setSession = useStore((state) => state.setSession)
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
    setSession(null)
  }
  return (
    <div>
      <LogoutIcon
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      DashBoard
    </div>
  )
}
