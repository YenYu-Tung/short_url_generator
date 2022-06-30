const express = require('express')
const router = express.Router()

const ShortURL = require('../../models/shorturl')

router.get('/', (req, res) => {
  res.render('index')
})
router.use(express.urlencoded({ extended: true }))
const generate_shorturl = require('../../generate_shorturl')

router.post('/', (req, res) => {
  const originalurl = req.body.url
  const url = generate_shorturl()
  return ShortURL.findOne({ originalURL: originalurl })
    .lean()
    .then((data) => {
      if (!data) {
        ShortURL.create({ shortURL: url, originalURL: originalurl })
        res.render('success', { url })

      } else {
        res.render('success', { url: data.shortURL })
      }
    })
    .catch(error => console.log(error))
})

router.get('/:shorturl', (req, res) => {
  const inputurl = req.params.shorturl
  return ShortURL.findOne({ shortURL: inputurl })
    .lean()
    .then((data) => {
      if (!data) {
        res.render('errorPage', { inputurl })
      } else {
        res.redirect(data.originalURL)
      }
    })
    .catch(error => connsole.log(error))
})

module.exports = router