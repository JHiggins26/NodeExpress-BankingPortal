
const express = require('express');
const path = require('path');
const fs = require('fs');
const data = require('./data');

const app = express();

// Can use, but it makes more sense to use the 'data' object to call its own functions.
//const { accounts, users, writeJSON } = require('./data')

// view engine setup
// set up directories
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));


// Call GET methods, then render the ejs file, passing the JSON object variable
app.get('/', function (req, res) { res.render('index', {title: 'Account Summary', accounts: accounts})});
app.get('/savings', (req, res) => { res.render('account', {account: accounts.savings})});
app.get('/checking', (req, res) => { res.render('account', {account: accounts.checking})});
app.get('/credit', (req, res) => { res.render('account', {account: accounts.credit})});
app.get('/profile', (req, res) => { res.render('profile', {user: users[0]})});
app.get('/transfer', (req, res) => { res.render('transfer')});
app.get('/payment', (req, res) => {res.render('payment', {account: accounts.credit})});

//Call POST methods
app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);

    data.writeJSON();
    res.render('transfer', {message: "Transfer Completed"});
});

app.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount, 10);

    data.writeJSON();
    res.render('payment', {message: "Payment Successful", account: accounts.credit});
});

app.listen(8080, () => console.log('PS Project Running on port 3000!'));
