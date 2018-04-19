// jshint asi:true

const express      = require('express')
const bodyParser   = require('body-parser')
const cookieParser = require('cookie-parser')
const path         = require('path')
const onHeaders    = require('on-headers')
const Cryptr       = require('cryptr')
const config       = require('./config')

const app          = express()
const cryptr       = new Cryptr(config.key);

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.use((req, res, next) => {
  req.session = decryptSession(req.cookies.sessionCookie)
  onHeaders(res, () => {
    // if (req.session === {}) {res.clearCookie('sessionCookie')}
    const secureSession = encryptSession(req.session)
    res.cookie('sessionCookie', secureSession)
  })
  next()
})

app.get('/', (req, res) => {
  res.render('index', req.session)
})

app.post('/', (req, res) => {
  req.session = req.body
  res.render('index', req.session)
})

app.get('/clear', (req, res) => {
  req.session = {}
  res.redirect('/')
})

const encryptSession = (session) => {
  if (!session) {
    session = {}
  }

  return cryptr.encrypt(JSON.stringify(session))
}

const decryptSession = (string) => {
  if (typeof string === 'undefined') {
    return {}
  }
  return JSON.parse(cryptr.decrypt(string))
}


app.listen(3000, () => {
  console.log('App 4 is listening on port 3000')
})