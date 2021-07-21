import { Storage } from './data/Storage.js'

export const redirect = (req, res) => {
  const code = req.url.replace(/\//, '')
  let found = false

  Storage.data.links.forEach(linkObject => {
    if (linkObject.code === code) {
      found = true
      res.redirect(linkObject.url)
    }
  })

  if (!found) {
    res.status(404).send('URL Not Found')
  }
}
