const express = require('express')
const router = express.Router()
const Record = require('../models/records')

// 1) 在首頁看到所有支出清單的總金額
router.get('/', (req, res) => {
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
// 2) 過濾類別、月份


router.get('/:date', (req, res) => {
  const month = req.params.date
  Record.find((err, records)=>{
    if (err) return console.log('month err!')
    const monthNum = records.filter(record => {
      return month === record.date.substring(5, 7)
    })
    let total = 0
    for(var i=0;i<monthNum.length;i++){
      total+=1*(monthNum[i].amount)
    }
    res.render('index', { 
      total: total,
      record: monthNum,
      month })
  })
})

// 3) 新增一筆支出
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('', (req, res) => {
  const record = Record({
    name: req.body.name,
    category: req.body.category,
    amount: req.body.amount,
    date: req.body.date,
  })
  record.save(err=>{
    if (err) return console.error(err)
    return res.redirect('/')
  })
})
// 4) 編輯支出的所有屬性 (一次只能編輯一筆) 
router.get('/:id/edit', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    return res.render('edit', {record: record})  
  })
})
router.put('/:id', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    record.name = req.body.name,
    record.category = req.body.category,
    record.amount = req.body.amount,
    record.date = req.body.date,
    record.save(err=>{
    if (err) return console.error(err)
    return res.redirect('/')
  }) 
  })
})
// 5) 刪除任何一筆支出 (一次只能刪除一筆)
router.delete('/:id/delete', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
  record.remove(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
  })
})



module.exports = router