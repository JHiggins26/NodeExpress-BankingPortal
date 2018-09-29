const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');


// Can use, but it makes more sense to use the 'data' object to call its own functions.
const { users } = require('./data')

// view engine setup
// set up directories
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

// Tell Express to use the Routes
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

// Call GET methods, then render the ejs file, passing the JSON object variable

app.get('/profile', (req, res) => { res.render('profile', {user: users[0]})});

app.listen(8080, () => console.log('PS Project Running on port 3000!'));
