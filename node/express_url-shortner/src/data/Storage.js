import fs, { appendFileSync } from 'fs'

const fileName = 'storage.json'
export const Storage = {
  data: fileExists() ? loadFile() : createFile(),
  write: () => {
    const op = fileExists() ? fs.writeFileSync : appendFileSync

    op(fileName, JSON.stringify(Storage.data, null, 2))
  },
}

function createFile() {
  return JSON.parse(
    fs.readFileSync(fs.appendFileSync(fileName, '{ links: [] }'), 'utf8')
  )
}

function loadFile() {
  return JSON.parse(fs.readFileSync(fileName, 'utf8'))
}

function fileExists() {
  return fs.existsSync(fileName)
}
