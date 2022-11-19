import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export const useDownloadUrl = (
  filePath: string | undefined,
  key: 'avatars' | 'posts'
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fullUrl, setFullUrl] = useState('')
  const buketName = key === 'avatars' ? 'avatars' : 'posts'
  useEffect(() => {
    if (filePath) {
      const download = async () => {
        setIsLoading(true)
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(filePath)
        if (error) {
          setIsLoading(false)
          throw new Error(error.message)
        }
        setFullUrl(URL.createObjectURL(data!))
        setIsLoading(false)
      }
      download()
    }
  }, [filePath, buketName])
  return {
    isLoading,
    fullUrl,
    setFullUrl,
  }
}
