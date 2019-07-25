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
  res.json({ a: 1 });
})

app.get('/test', (req,res) => {
	svar test = 'test'
    
    var client  = mqtt.connect('ec2-54-205-131-65.compute-1.amazonaws.com',{port: 1883, username:'elyh',password:'lapetina' })
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
