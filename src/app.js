const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
        res.render('index', {title: 'Index'})
    }
);

app.listen(8080, () => {

    console.log('PS Project Running on port 8080!')

});
