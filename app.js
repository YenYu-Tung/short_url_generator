const express = require('express')

//重構mongoose connection
require('./config/mongoose')

//template engine
const exphbs = require('express-handlebars')
const app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//重構路由器
const routes = require('./routes')
app.use(routes)

//靜態資料
app.use(express.static('public'))

app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})

