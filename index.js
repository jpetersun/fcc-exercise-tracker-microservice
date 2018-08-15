const express = require('express')
const boom = require('boom')

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// 1. POST /api/exercise/new-user
// 2. POST /api/exercise/add
// 3. GET /api/exercise/log?{userId}[&from][&to][&limit]
// {} = required, [] = optional
// from, to = (YYYY-MM-DD)
// limit = Number

// error handler middleware using boom
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }

  return res.status(err.output.statusCode).json(err.output.payload)
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

module.exports = app
