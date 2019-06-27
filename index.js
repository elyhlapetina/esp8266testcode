const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');

const app = express()
app.get('/', (req, res) => {
  res.send('HEY!')
})

app.get('/settings', (req, res) => {
  res.send('Return settings here...')
})

app.listen(3000, () => console.log('Server running on port 3000'))
