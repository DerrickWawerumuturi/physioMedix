import { createClient } from '../supabase/client'

export async function getImages(id: number) {
  const supabase = createClient()

  const { data: imageName, error } = await supabase.from('media').select('filename').eq('id', id)
  if (error) {
    console.log('Error fetching image', error)
    return null
  } else {
    return imageName
  }
}
