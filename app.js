const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const routes = require('./routes')
app.use(routes)

app.use(express.static('public'))

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})


app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})

