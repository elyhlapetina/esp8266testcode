const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
var mqtt = require('mqtt');

const app = express()
app.get('/', (req, res) => {
  res.send('HEY!')
})

app.get('/settings', (req, res) => {
  res.json({ a: 2	 });
})

app.get('/test', (req,res) => {
	var test = 'test'
    var client  = mqtt.connect('mqqt://elyh:lapetina@ec2-54-205-131-65.compute-1.amazonaws.com')

    client.on('connect', function () {

      client.subscribe('test', function (err) {


        if (!err) {
          test = 'success'
          client.publish('test', 'Hello mqtt')
        } else {
          test = 'fail'

        }
      })
    })


})

app.listen(3000, () => console.log('Server running on port 3000'))
