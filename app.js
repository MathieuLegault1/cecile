require('dotenv').config()
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.post('/responses', function(request, response) {
  console.log(request.body);
  response.send(request.body);
})

app.listen(process.env.PORT, function() {
  console.log('Example app listening on port:' + process.env.PORT)
})
