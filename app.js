const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
const ShortURL = require('./models/shorturl')
const generate_shorturl = require('./generate_shorturl')


app.use(express.static('public'))

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const originalurl = req.body.url
  const url = generate_shorturl()
  return ShortURL.findOne({originalURL: originalurl})
    .lean()
    .then((data) => {
      if (!data) {
        ShortURL.create({shortURL: url, originalURL: originalurl})
        res.render('success', { url })
        
      }else {
        res.render('success', { url: data.shortURL })
      } 
    })      
    .catch(error => console.log(error))
})

app.get('/:shorturl', (req, res) => {
  const inputurl = req.params.shorturl
  return ShortURL.findOne({shortURL: inputurl})
    .lean()
    .then((data) => {
      if (!data) {
        res.render('errorPage', {inputurl})
      }else {
        res.redirect(data.originalURL)
      }
    })
    .catch(error => connsole.log(error))  
})

app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})

