// server.js
// the goodies
const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  validate = require("express-validator"),
  // database stuff
  AppDAO = require("./data/dao"),
  dao = new AppDAO("./data/database.sqlite3");
// table access
(PlayerRepo = require("./data/players_repo")), (players = new PlayerRepo(dao));
(GameRepo = require("./data/games_repo")), (games = new GameRepo(dao));
(TrashRepo = require("./data/trash_repo")), (trash = new TrashRepo(dao));


app = express();

app.use(express.static(path.join(__dirname, "public"))); // for accessing files
app.use(bodyParser.urlencoded({ extended: true }));  // to parse the forms

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", function(req, res) {

  players.createTable() // create table if not already made
    .then(() => {
      return players.selectAll(); // select * from players;
    })
    .then(data => {
      res.render("pages/index", {
        data: data // renders the data for the ejs
      });
    })
});

// report page
app.get("/report", function(req, res) {
  players.createTable() // create table if not already made
    .then(() => {
      return players.selectName(); // select * from players;
    })
    .then(data => {
      res.render("pages/report", {
        data: data // renders the data for the ejs
      });
    })
});

app.post("/submit-game", (req, res) => {
  const {name1, name2, name3, name4, wins1, wins2}= req.body;
  const names = [name1, name2, name3, name4];
  for (let i = 0; i < names.length; i++) {
    players.createTable() // create table if not already made
    .then(() => {
      console.log(names[i])
      return players.getByName(names[i]);
    })
    .then(data => {
      if (i <= 2) { // team 1
        console.log('team1')
        let wonRounds = parseInt(wins1) + data.wins_round ;
        let wonSeries = data.wins_series;
        let playedSeries = data.played_series + 1;
        if (wins1 >= 3) {
          wonSeries ++;
        }
        players.update(data.id, wonRounds, wonSeries, playedSeries)
      }

      else { // team 2
        console.log('team2')
        let wonRounds = parseInt(wins2) + data.wins_round ;
        let wonSeries = data.wins_series;
        let playedSeries = data.played_series + 1;
        if (wins2 >= 3) {
          wonSeries ++;
        }
        players.update(data.id, wonRounds, wonSeries, playedSeries)
      }
    })
  }
  res.redirect('back');
  res.end();
});

app.post("/submit-play", (req, res) => {
  const {play}= req.body;
  console.log(play)
  players.createTable()
    .then(() => {
        return players.create(play, 0, 0, 0)
    })
  console.log("new player added: " + play);
  res.redirect('back');
  res.end();
});

app.post("/submit-suggest", (req, res) => {
  const {name, trash}= req.body;
  console.log(name + " suggests: " + trash);
  trashcan.createTable() // create table if not already made
    .then(() => {
      return trashRepo.create(name, trash) // add suggestion
    })
  res.redirect('back');
  res.end();
});

app.listen(8080);
console.log("8080 is the magic port");
