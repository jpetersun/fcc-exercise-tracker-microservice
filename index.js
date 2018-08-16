const express = require('express')
const boom = require('boom')

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// 1. POST /api/exercise/new-user
// request: { username: String }
// response: { username, _id }

// 2. POST /api/exercise/add?{userId}
// request: { _id: String, description: String, duration: Number, date: String(YYYY-MM-DD) }
// response: { _id, username, description, duration,  date }

// 3. GET /api/exercise/log?{userId}[&from][&to][&limit]
// request: { userId: String, from: String(YYYY-MM-DD), to: String(YYYY-MM-DD), limit: Number }
// {} = required, [] = optional
// from, to = (YYYY-MM-DD)
// limit = Number
// response: { userId, from, to, log: Array()}

// error handler middleware using boom
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }

  return res.status(err.output.statusCode).json(err.output.payload)
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

module.exports = app
