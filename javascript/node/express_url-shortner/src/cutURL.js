import { Storage } from './data/Storage.js'

const urlRegex = /^(https?:\/\/)?[\d\w]+\.[\w]+(\/.*)*/

export const cutURL = (req, res) => {
  if (req.body.url === undefined || !urlRegex.test(req.body.url)) {
    return res.status(400).send('Bad request')
  }

  const code = 'x'
    .repeat(5)
    .replace(/x/g, () => Math.floor(Math.random() * 16))
    .toString(16)

  Storage.data.links.push({
    url: req.body.url,
    code,
  })
  Storage.write()

  res.status(200).send({
    code,
  })
}
