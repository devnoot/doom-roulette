import { randomFromArray } from './utils'

export type File = {
  id: string
  title: string
  dir: string
  filename: string
  size: string
  age: string
  date: string
  author: string
  email: string
  description: string
  rating: string
  votes: string
  url: string
  idgamesurl: string
}

export type ModType = 'DOOM' | 'DOOM 2' | 'HERETIC' | 'HEXEN'

export type getRandomWadProps = {
  selectedModTypes: ModType[]
  retries?: number
  maxRetries?: number
}

export async function getRandomWad({
  selectedModTypes,
  retries = 1,
  maxRetries = 3
}: getRandomWadProps) {
  const modType = (randomFromArray(selectedModTypes) as string)
    .toLowerCase()
    .replace(' ', '')
  const name = `levels/${modType}/`
  const outputType = `json`

  let action = `getdirs`

  let url = encodeURI(`/api?action=${action}&name=${name}&out=${outputType}`)

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
  url = encodeURI(`/api?action=${action}&name=${dir.name}&out=${outputType}`)

  const getFilesRes = await fetch(url)
  const getFilesJson = await getFilesRes.json()

  // files are in json.content.file
  if (!getFilesJson.content) {
    if (retries <= maxRetries) {
      retries++
      return await getRandomWad({ selectedModTypes, retries, maxRetries })
    }
    throw new Error('Bad response from server')
  }

  // get a random file from json.content.file
  const file =
    getFilesJson.content.file[
      Math.floor(Math.random() * getFilesJson.content.file.length)
    ]

  return file
}
