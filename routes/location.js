const express = require('express')
const dbClient = require('mongodb').MongoClient

const router = express.Router()
var url = 'mongodb://localhost:27017/'

router.post('/update', (req, res) => {
  dbClient.connect(url, (err, db) => {
    if (err) {
      res.send('Failed to log')
    } else {
      global.db = db
      updateLocation(req)
      res.send('Location Logged')
    }
  })
})

function updateLocation (req) {
  var db = global.db.db('BAS')
  var LObject =
  {
    lat: req.body.lat,
    long: req.body.long,
    devID: req.body.id
  }
  db.collection('Locations').insertOne(LObject, (err, res) => {
    if (err) {
      console.log(err)
    }
    global.db.close()
  })
}

module.exports = router
