const express = require('express')
const router = express.Router()

//載入model
const ShortURL = require('../../models/shorturl')

router.get('/', (req, res) => {
  res.render('index')
})

//使用body-parser
router.use(express.urlencoded({ extended: true }))
//載入function
const generate_shorturl = require('../../generate_shorturl')

//新增短URL
router.post('/', (req, res) => {
  const originalurl = req.body.url
  const urlhead = req.body.url.split(':')[0]
  const url = generate_shorturl()
  return ShortURL.findOne({ originalURL: originalurl })
    .lean()
    .then((data) => {
      //判斷資料庫是否有輸入URL的資料, 無則新增,有則直接回傳
      if (!data) {
        ShortURL.create({ shortURL: url, originalURL: originalurl })
        res.render('success', { url, urlhead})
      } else {
        res.render('success', { url: data.shortURL, urlhead })
      }
    })
    .catch(error => console.log(error))
})
//使用者使用產生的短網址則回傳原先輸入的網址
router.get('/:shorturl', (req, res) => {
  const inputurl = req.params.shorturl
  const urlhead = inputurl.split(':')[0]
  const url = generate_shorturl()
  return ShortURL.findOne({ shortURL: inputurl })
    .lean()
    .then((data) => {
      //判斷資料庫是否有短網址資料
      if (!data) {
        res.render('errorPage', { inputurl, urlhead })
      } else {
        res.redirect(data.originalURL)
      }
    })
    .catch(error => connsole.log(error))
})

module.exports = router