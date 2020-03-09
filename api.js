const express = require('express')
const nforce = require('nforce')

const app = express()
app.use(express.json({ type: 'application/json' })) // this type: is required by body-parser

app.use(function(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Accept, Authorization, Content-Type, Origin, X-Requested-With',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, PATCH, DELETE, OPTIONS',
  })

  if (req.method == 'OPTIONS') {
    res.send(200)
  }
  else {
    next()
  }
})

// define error-handling middleware last, after other app.use() and routes calls
// https://expressjs.com/en/guide/error-handling.html#the-default-error-handler
app.use(function(err, req, res, next) {
  console.log(err.toString())
  if (res.headersSent) return next(err)
  handleError(res, 500, 'Unhandled error', err.toString())
})

const connected_app = 'https://nodesvr.herokuapp.com'

// var oauth // how should I use this?

var org = nforce.createConnection({
  environment: 'sandbox',
  mode: 'single',
  username: '(CONFIDENTIAL)',
  password: '(CONFIDENTIAL)',
  clientId: '(CONFIDENTIAL)',
  clientSecret: '(CONFIDENTIAL)',
  redirectUri: `${connected_app}/oauth/_callback`,
  // oauth: oauth,
})

org.authenticate()
  .then((auth) => {
    console.log('--> oauth options object:\n' + JSON.stringify(auth) + '\n')
    // oauth = auth
  })
  .catch((err) => {
    console.log(`--> Org authentication failed: ${err.message}`)
  })

const port = process.env.PORT || 3000

app.listen(port, '0.0.0.0', function() {
  console.log(`Listening on Port ${port}`)
})

app.get('/', function (req, res) {
  res.send({"message": "Hello, world"})
})

app.get("/api/contacts", function(req, res) {
  // Do SOQL query and return the list
})

app.post("/api/contacts", function(req, res) {
  if(JSON.stringify(req.body) == '{}') {
    sendErrorResponse(res, 400, 'Could not read the request payload.',
      "Make sure the request has a Content-Type header for 'application/json'")
    return
  }

  const newContact = req.body

  if (!(newContact.LastName)) sendErrorResponse(res, 400, 'Invalid user input', 'LastName is required')

  const sObject = nforce.createSObject('Contact', newContact)

  org.insert({ sobject: sObject }, function(err, resp) {
    if(err) sendErrorResponse(res, err.statusCode, `--> Unable to insert Contact for ${newContact.FirstName} ${newContact.LastName}`, err.message)
    console.log(`Contact inserted for ${newContact.FirstName} ${newContact.LastName} ` + JSON.stringify(resp))
    res.status(201).json(resp)
  })
})

//Generic error handler for use by all endpoints; Keeps this API from returning HTML error pages
function sendErrorResponse( res, status, reason, message) {
  console.log(`ERROR: ${reason}\n ${message}`)
  res.status(status).send(`ERROR: ${reason}\n ${message}`)
}
