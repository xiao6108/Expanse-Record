const express = require('express')
const router = express.Router()
const Record = require('../models/records')
const { authenticated } = require('../config/auth')

// 1) 在首頁一次瀏覽所有支出的清單
router.get('/', authenticated, (req, res) => {
  Record.find({ userId: req.user._id }, (err, record) => {
    let total = 0
    for (var i = 0; i < record.length; i++) {
      total += 1 * (record[i].amount)
    }
    if (err) return console.error(err)
    return res.render('index', {
      record: record,
      total: total
    })
  })
})


module.exports = router