const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const helpers = require('handlebars-helpers')()
const router = express.Router()
const session = require('express-session')
const passport = require('passport')

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection
const Record = require('./models/records')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')))
app.use(methodOverride('_method'))

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})
app.use(session({
  secret: 'your secret key',
  resave: 'false',
  saveUninitialized: 'false',
}))
// 使用 Passport
require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}

app.use('/', require('./routes/home'))
app.use('/expanse', require('./routes/expanse'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))


app.listen(3000, () => {
  console.log('app is running')
})