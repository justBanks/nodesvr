const express = require('express')
//var cors = require('cors')
const app = express()

//app.use(cors())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, Origin, X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS')
  if ('OPTIONS' === req.method) {
    res.send(200)
  }
  else {
    next()
  }
})

app.use(express.json())

app.get('/', function (req, res) {
  res.send({"message": "Hello, world"})
})

app.post('/api', function(req, res){
	// res.setHeader('Content-Type', 'application/json')
	res.send(req.body)
})

// app.options("/*", function(req, res){
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, Origin, X-Requested-With')
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS')
//   res.send(200)
// })

var port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', function() {
	console.log(`Listening on Port ${port}`)
})
