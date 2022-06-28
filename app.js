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

app.post('/newurl', (req, res) => {
  const originurl = req.body.url
  console.log(originurl)
  const url = generate_shorturl()
  console.log(url)
  res.render('success', {url})
})

app.get('', (req, res) => {
  res.redirect()
})

app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})