const express = require('express')
const app = express()
 
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

app.get('/', function (req, res) {
  res.send({"message": "Hello, world"})
})
 
app.post('/api', function(req, res){
	res.setHeader('Content-Type', 'application/json')
	res.send(req.body)
})

var port = process.env.PORT || 3000
app.listen(port, "0.0.0.0", function() {
	console.log(`Listening on Port ${port}`)
})
