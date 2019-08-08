// server.js
// load the things we need
const express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
validate = require('express-validator'),

// database stuff
Promise = require('bluebird'),
AppDAO = require('./data/dao'),
dao = new AppDAO('./data/database.sqlite3')
PlayerRepo = require('./data/players_repo'),
players = new PlayerRepo(dao);

app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
  let data = {};
  players.createTable()
  .then(() => {
      return players.selectAll()
    })
    .then((rows)=>{
      for (row in rows) {
      console.log(row + ": " + rows[row]) }

    }).then(()=> {

  const table = [
    { name: 'Ben', points: 3 },
    { name: 'Jose', points: 5 },
    { name: 'Luke', points: 10 }
]
const tagline = "This is a placeholder until I get the db connected.";

res.render('pages/index', {
    table: table,
    tagline: tagline,
    data: data
});

});
});

// report page 
app.get('/report', function(req, res) {
    res.render('pages/report');
});


app.post('/submit-game', (req, res) => {
  const username = req.body.username
  console.log(username);
  res.end()
})


app.listen(8080);
console.log('8080 is the magic port');