import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Profile, EditedProfile } from '../types'
import { useMutation, useQueryClient } from 'react-query'

export const useMutateProfile = () => {
  const queryClient = useQueryClient()
  const createProfileMutation = useMutation(
    async (profile: Omit<Profile, 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase.from('profile').insert(profile)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        queryClient.setQueryData(['profile'], res[0])
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return {}
}
