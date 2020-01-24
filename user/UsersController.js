const express = require('express')
const router = express.Router()
const User = require('./User')
const bcrypt = require('bcryptjs')

router.get('/admin/users', (req, res) => {
  User.findAll().then(users => {
    res.render('admin/users/index', {
      users,
    })
  })
})

router.get('/admin/users/create', (req, res) => {
  res.render('admin/users/create')
})

router.post('/users/create', (req, res) => {
  let email = req.body.email
  let password = req.body.password

  User.findOne({ where: { email } }).then(user => {
    if (email == '' || password == '') {
      res.redirect('/admin/users/create')
    }

    if (user == undefined) {
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)
      console.log(email, hash)
      User.create({
        email,
        password: hash,
      })
        .then(() => {
          res.redirect('/')
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
    } else {
      res.redirect('/admin/users/create')
    }
  })
})

router.get("/login", (req, res) => {
  res.render('admin/users/login')
})

router.post('/authenticate', (req, res) => {
  let email = req.body.email
  let password = req.body.password

  User.findOne({where: {email}}).then(user => {
    if(user != undefined) { // Caso exista o usuario com esse email
      // Validar senha
      let correct = bcrypt.compareSync(password, user.password)

      if(correct) {
        req.session.user = {
          id: user.id,
          email: user.email
        }
        res.redirect('/admin/articles')
      } else {
        res.redirect('/login')
      }

    } else {
      res.redirect('/login')
    }

  })

})

router.get('/logout', (req, res) => {
  req.session.user = undefined
  res.redirect('/')
})

module.exports = router
