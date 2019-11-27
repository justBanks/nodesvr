const express = require('express')
const app = express()
 
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/', function (req, res) {
  res.send({"message": "Hello, world"})
})
 
app.post('/', function(req, res){
	res.setHeader('Content-Type', 'application/json')
	res.send(req.body)
})

app.listen()
