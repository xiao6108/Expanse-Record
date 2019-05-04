const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/expanse', {useNewUrlParser: true})

const db = mongoose.connection
const Record = require('./models/records')

db.on('error', ()=>{
  console.log('mongodb error!')
})

db.once('open', ()=>{
  console.log('mongodb connected')
})

app.get('/', (req,res)=>{
  res.send('Hello')
})

app.listen(3000,()=>{
  console.log('app is running')
})