const mongoose = require('mongoose')
const Record = require('../records')
const RecordJSON = require('../../record.json')
const data = RecordJSON.results

mongoose.connect('mongodb://localhost/expanse', {useNewUrlParser:true})

const db = mongoose.connection

db.on('error', ()=>{
  console.log('db error')
})
db.once('open', ()=>{
  for (var i=0;i<data.length;i++){
    Record.create({
      name: data[i].name,
      category: data[i].category,
      date: data[i].date,
      amount: data[i].amount
    });
  }
  console.log('db done!')
})