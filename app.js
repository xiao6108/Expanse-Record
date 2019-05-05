const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const path = require('path')

mongoose.connect('mongodb://localhost/expanse', {useNewUrlParser: true})

const db = mongoose.connection
const Record = require('./models/records')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, '/public')))

db.on('error', ()=>{
  console.log('mongodb error!')
})

db.once('open', ()=>{
  console.log('mongodb connected')
})

// 1) 在首頁一次瀏覽所有支出的清單
app.get('/', (req, res) => {
  Record.find((err, record) => {
    if (err) return console.error(err)
    return res.render('index', {record: record})  
  })
})
// 2) 在首頁看到所有支出清單的總金額
app.get('/expanse', (req, res) => {
  Record.find((err, record) => {
    if (err) return console.error(err)
    return res.render('index', {record: record})  
  })
})
// 3) 新增一筆支出
app.get('/expanse/new', (req, res) => {
  return res.render('new')
})
app.post('/expanse', (req, res) => {
  return res.render('new')
})
// 4) 編輯支出的所有屬性 (一次只能編輯一筆) 
app.get('/expanse/:id/edit', (req, res) => {
  Record.find((err, record) => {
    if (err) return console.error(err)
    return res.render('edit', {record: record})  
  })
})
app.post('/expanse/:id', (req, res) => {
  Record.find((err, record) => {
    if (err) return console.error(err)
    return res.render('edit', {record: record})  
  })
})
// 5) 刪除任何一筆支出 (一次只能刪除一筆)
app.post('/expanse/:id/delete', (req, res) => {
  Record.find((err, record) => {
    if (err) return console.error(err)
    return res.render('index', {record: record})  
  })
})




app.listen(3000,()=>{
  console.log('app is running')
})