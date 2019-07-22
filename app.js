
const express = require('express')

require('dotenv').config()

const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests



const db = require('./orbita-backend/db/db').database

const getUsersQuery = require('./orbita-backend/actions/getusers')
const getUsersByIdQuery = require('./orbita-backend/actions/getusersbyid')
const postUserQuery = require('./orbita-backend/actions/postuser')
const deleteUserQuery = require('./orbita-backend/actions/deleteuser')
const loginUser = require('./orbita-backend/actions/login')
const getSolarPanel = require('./orbita-backend/actions/getsolarpanel')
const getSolarPanelState = require('./orbita-backend/actions/getsolarpanelbystate')

const authorization = require('./orbita-backend/controllers/authorization');

const app = express()


const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) 

app.get('/', (req, res) => res.send('Bem vindo à api'))
app.post('/login', (req, res) => loginUser.login(req, res, db))
app.get('/users', authorization.verifyJWT, (req, res) => getUsersQuery.getUsers(req, res, db))
app.post('/users', authorization.verifyJWT, (req, res) => postUserQuery.postUser(req, res, db))
app.get('/users/:id',authorization.verifyJWT, (req, res) => getUsersByIdQuery.getUsersById(req, res, db))
app.delete('/users/:id', authorization.verifyJWT, (req, res) => deleteUserQuery.deleteUser(req, res, db))

app.get('/solar_data',authorization.verifyJWT, (req, res) => getSolarPanel.getAllSolarPanel(req, res, db))
app.get('/solar_data/:state',authorization.verifyJWT, (req, res) => getSolarPanelState.getSolarPanelByState(req, res, db))


app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})
