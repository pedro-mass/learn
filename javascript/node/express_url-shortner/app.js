import express from 'express'
import { Storage } from './src/data/Storage.js'
import { cutURL } from './src/cutURL.js'
import { redirect } from './src/redirect.js'

const app = express()
const port = 8080

app.use(express.json())

if (Storage.data.links === undefined) {
  Storage.data.links = []
  Storage.write()
}

// app.all('*', (req, res, next) => {
//   console.log({ req, res })

//   next()
// })
app.post('/cut', cutURL)
app.get('/[a-f0-9]{5}', redirect)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
