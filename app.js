const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const helpers = require('handlebars-helpers')()
const router = express.Router()

mongoose.connect('mongodb://localhost/expanse', {useNewUrlParser: true})

const db = mongoose.connection
const Record = require('./models/records')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')))
app.use(methodOverride('_method'))

db.on('error', ()=>{
  console.log('mongodb error!')
})

db.once('open', ()=>{
  console.log('mongodb connected')
})

// 1) 在首頁一次瀏覽所有支出的清單
app.get('/', (req, res) => {
  Record.find((err, record) => {
    let total = 0
    for(var i=0;i<record.length;i++){
      total+=1*(record[i].amount)
    }
    if (err) return console.error(err)
    return res.render('index', {
      record: record,
      total: total
      })  
  })
})

app.use('/', require('./routes/home'))
app.use('/expanse', require('./routes/expanse'))



app.listen(3000,()=>{
  console.log('app is running')
})