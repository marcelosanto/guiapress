const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

const categoriesController = require('./categories/categoryController')
const articlesController = require('./articles/articlesController')

// View engine
app.set('view engine', 'ejs')

// Static
app.use(express.static('public'))

//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Database
connection
  .authenticate()
  .then(() => {
    console.log('Conexao feita com sucesso!')
  }).catch((err) => console.log(err))

app.use('/', categoriesController)
app.use('/', articlesController)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(8080, () => {
  console.log('O servidor esta rodando')
})