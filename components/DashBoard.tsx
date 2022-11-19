import { FC, Suspense } from 'react'
import { ExclamationCircleIcon, LogoutIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { UserProfile } from './UserProfile'
import { ErrorBoundary } from 'react-error-boundary'
import { Spinner } from './Spinner'
import { useQueryClient } from 'react-query'

export const DashBoard: FC = () => {
  const queryClient = useQueryClient()
  const setSession = useStore((state) => state.setSession)
  const resetProfile = useStore((state) => state.resetEditedProfile)
  const signOut = async () => {
    setSession(null)
    resetProfile()
    supabase.auth.signOut()
    queryClient.removeQueries(['profile'])
  }
  return (
    <div>
      <LogoutIcon
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <UserProfile />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}
