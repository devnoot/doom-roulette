import { useCallback, useEffect, useState } from 'react'

import { File } from '../lib/idgames'

export type useRandomWadProps = {
  modType: 'doom' | 'doom2' | 'doom64' | 'heretic' | 'hexen' | string
  maxRetries?: number
}

export const useRandomWad = ({
  modType,
  maxRetries = 3
}: useRandomWadProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [wad, setWad] = useState<File | null>(null)

  let retries = 1

  const getRandomWad = useCallback(async () => {
    try {
      // Clear out the stale wad first
      setWad(null)

      setLoading(true)

      // First we need to get the directories
      const name = `levels/${modType}/`
      const outputType = `json`

      let action = `getdirs`

      let url = encodeURI(
        `/api?action=${action}&name=${name}&out=${outputType}`
      )

      const getDirsRes = await fetch(url)
      const getDirsJson = await getDirsRes.json()

      // getDirsJson.content.dir is an array of directories
      const dirs = getDirsJson.content.dir.filter(
        (dir: { id: number; name: string }) =>
          !dir.name.includes('deathmatch') || !dir.name.includes('Ports')
      )

      // choose a random directory
      const dir = dirs[Math.floor(Math.random() * dirs.length)]

      // get the files in that directory
      action = 'getfiles'
      url = encodeURI(
        `/api?action=${action}&name=${dir.name}&out=${outputType}`
      )

      const getFilesRes = await fetch(url)
      const getFilesJson = await getFilesRes.json()

      // files are in json.content.file
      if (!getFilesJson.content) {
        if (retries <= maxRetries) {
          retries++
          return await getRandomWad()
        }
        throw new Error('Bad response from server')
      }

      // get a random file from json.content.file
      const file =
        getFilesJson.content.file[
          Math.floor(Math.random() * getFilesJson.content.file.length)
        ]

      setWad(file)
    } catch (e) {
      console.error(e)
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }, [modType])

  // Get a new random wad when modType changes
  useEffect(() => {
    getRandomWad()
  }, [modType])

  return { loading, error, wad, getRandomWad }
}
