var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var helper = require('./controllers/helper');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(express.static(__dirname + '/client'));
app.set('views', __dirname + '/client');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.render('index.html');
});

var router = express.Router();

router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
    // helper.authorize(req, res, next);
});

var authRouter = require('./routes/auth.js')(router);
// var userRouter = require('./routes/user.js')(router);

app.use('/api', authRouter);
// app.use('/api', userRouter);

mongoose.connect(config.db);
process.on('uncaughtException', function(err) {
    console.log(err);
});
app.listen(config.port);
console.log('App jalan pada port ' + config.port);