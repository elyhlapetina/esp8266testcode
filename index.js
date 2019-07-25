const express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors')
const http = require('http');
const path = require('path');
const fs = require('fs');
var mqtt = require('mqtt');
const app = express()


var test = ''
var lastalive = ''

var client  = mqtt.connect('mqqt://elyh:lapetina@ec2-54-205-131-65.compute-1.amazonaws.com')

client.on('connect', function () {

  client.subscribe('test', function (err) {
    if (!err) {
      test = 'success'
      
    } else {
      test = 'fail'

    }
  })



    client.subscribe('alive', function (err) {
    if (!err) {
      test = 'success'
      
    } else {
      test = 'fail'

    }
  })
})

client.on('message', (topic, message) => {
  switch (topic) {
    case 'alive':
		var d = Date(Date.now()); 
		lastalive = d.toString();
		return
    case 'test':
      return
  }
  console.log('No handler for topic %s', topic)
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 

app.get('/', (req, res) => {
  res.send('HEY!')
})

app.get('/settings', (req, res) => {

  res.json({ last: lastalive});
})




app.post('/test', (req,res) => {
	var data=req.body.inc_data;
	client.publish('test', data)

})

app.listen(3000, () => console.log('Server running on port 3000'))
