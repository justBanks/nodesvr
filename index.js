const express = require('express')
const app = express()
 
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.post('/', function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(req.body)
})

app.listen(3000)