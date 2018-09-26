
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');

const accounts = JSON.parse(accountData);


const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');

const users = JSON.parse(userData);

//Call GET method, then render the ejs file, passing the JSON object variable
app.get('/', function (req, res) {
        res.render('index', {title: 'Account Summary', accounts: accounts})
    }
);

app.get('/profile', (req, res) => { res.render('profile', {user: users[0]}) })

app.listen(3000, () => console.log('PS Project Running on port 3000!'));
