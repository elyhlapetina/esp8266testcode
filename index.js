const express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors')
const http = require('http');
const path = require('path');
const fs = require('fs');
var mqtt = require('mqtt');
const app = express()


var test = ''

var client  = mqtt.connect('mqqt://elyh:lapetina@ec2-54-205-131-65.compute-1.amazonaws.com')

client.on('connect', function () {

  client.subscribe('test', function (err) {
    if (!err) {
      test = 'success'
      
    } else {
      test = 'fail'

    }
  })
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 

app.get('/', (req, res) => {
  res.send('HEY!')
})

app.get('/settings', (req, res) => {

  res.json({ a: 2	 });
})




app.post('/test', (req,res) => {
	var data=req.body.inc_data;
	client.publish('test', data)


})

app.listen(3000, () => console.log('Server running on port 3000'))
