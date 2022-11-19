import { supabase } from '../utils/supabase'
import { Profile } from '../types'
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
  const updateProfileMutation = useMutation(
    async (profile: Omit<Profile, 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('profile')
        .update(profile)
        .eq('id', profile.id)
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
  return { createProfileMutation, updateProfileMutation }
}
