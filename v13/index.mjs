import { processRequest, Upload } from 'graphql-upload'
import { createServer } from 'http'

createServer(async function(req, res) {
  const body = await processRequest(req, res)

  /** @type Upload */
  const file = body.variables.input.file
  const upload = await file.promise
  const readStream = upload.createReadStream()

  const parts = []
  readStream.on(`data`, (data) => parts.push(data))
  readStream.on(`end`, () => {
    const buffer = Buffer.concat(parts)
    readStream.destroy()

    if (buffer.length !== 100) {
      console.log(`buffer length`, buffer.length)
    }

    readStream.destroy()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(body))
  })
}).listen(process.env.PORT || 4000, process.env.HOST)