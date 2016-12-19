var express = require('express')
var prerender = require('prerender-node')
var app = express()

app.set('port', (process.env.PORT || 5000))

app.use(prerender);

app.use(express.static(__dirname + '/dist'))

app.get('/*', function(req, res){
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
