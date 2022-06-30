const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')



const app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const routes = require('./routes')
app.use(routes)

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})

