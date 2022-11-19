import { supabase } from '../utils/supabase'
import { useQuery } from 'react-query'
import useStore from '../store'
import { useMutateProfile } from './useMutateProfile'

export const useQueryProfile = () => {
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const update = useStore((state) => state.updateEditedProfile)
  const { createProfileMutation } = useMutateProfile()
  const getProfile = async () => {
    const { data, error, status } = await supabase
      .from('profile')
      .select('*')
      .eq('id', session?.user?.id)
      .single()
    if (error && status === 406) {
      createProfileMutation.mutate({
        id: session?.user?.id,
        username: session?.user?.email,
        avatar_url: '',
        favorites: '',
      })
      update({
        ...editedProfile,
        username: session?.user?.email,
      })
    }
    if (error && status !== 406) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
    onSuccess: (data) => {
      if (data) {
        update({
          username: data.username,
          avatar_url: data.avatar_url,
          favorites: data.favorites,
        })
      }
    },
  })
}
