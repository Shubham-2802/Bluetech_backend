const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signIn')
const adminsignin = require('./controllers/adminsignIn')
const adminregister = require('./controllers/adminregister')
const profile = require('./controllers/profile')

const db = knex({
  client:'pg',
  connection: {
    host : '127.0.0.1',
    user : 'shubham',
    password : '',
    database : 'bluetech'
  }
});

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res)=>{res.send("Hello,Its working,It was just a check.")})

app.post('/signIn', (req,res) => {signin.handlesignIn(req,res,bcrypt,db)})

app.post('/Register' , (req,res) => {register.handleRegister(req,res,bcrypt,db)})

app.post('/adminsignIn', (req,res) => {adminsignin.handleadminsignIn(req,res,bcrypt,db)})

app.post('/adminRegister' , (req,res) => {adminregister.handleadminRegister(req,res,bcrypt,db)})

app.get('/Profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})

app.listen(process.env.PORT || 3001,() => {
	console.log(`Server is running at Port: ${ process.env.PORT }`)
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

//disableHostCheck: true
