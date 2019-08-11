// server.js
// the goodies
const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  {check, validationResult} = require("express-validator"),
  // database stuff
  AppDAO = require("./data/dao"),
  dao = new AppDAO("./data/database.sqlite3");
// table access
(PlayerRepo = require("./data/players_repo")), (players = new PlayerRepo(dao));
(GameRepo = require("./data/games_repo")), (games = new GameRepo(dao));
(TrashRepo = require("./data/trash_repo")), (trashcan = new TrashRepo(dao));


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
  let {name1, name2, name3, name4, wins1, wins2}= req.body;
  if (parseInt(wins1) + parseInt(wins2) != 5) {
    res.send(500,'The number of wins submitted did not add up to 5. Please go back and try again.')
  }
  if (name1 == undefined || name2 == undefined || name3 == undefined || name4 == undefined) {
    res.send(500, 'Please select players from the list')
  }
  const names = [name1, name2, name3, name4];
  wins1 = parseInt(wins1);
  wins2 = parseInt(wins2);
  if (hasDuplicate(names)) {
    res.send(500, 'There was a duplicate player name. Please go back and try again.')
  }
  // PLAYERS
  for (let i = 0; i < names.length; i++) {
    players.createTable() // create table if not already made
    .then(() => {
      return players.getByName(names[i]);
    })
    .then(data => {
      if (i < 2) { // team 1
        let wonRounds = wins1 + data.wins_round;
        let wonSeries = data.wins_series;
        let playedSeries = data.played_series + 1;
        if (wins1 >= 3) {
          wonSeries ++;
        }
        players.update(data.id, wonRounds, wonSeries, playedSeries)
      }
      else { // team 2
        let wonRounds = wins2 + data.wins_round ;
        let wonSeries = data.wins_series;
        let playedSeries = data.played_series + 1;
        if (wins2 >= 3) {
          wonSeries ++;
        }
        players.update(data.id, wonRounds, wonSeries, playedSeries)
      }
    })
  }

  // GAMES
  games.createTable()
  .then(() => {
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return games.create(name1, name2, name3, name4, wins1, wins2, datetime)
  })
  res.redirect('back');
  res.end();
});

app.post("/submit-play", [
  check('play').isLength({ min: 3 }).trim().escape().withMessage('Name must be at least 3 chars long. First name and last initial. Please Go back and try again.')
], (req, res) => {
  let {play}= req.body;
  play = play.toLowerCase().capitalize();
  players.createTable()
    .then(() => {
      return players.getByName(play)})// if player is already created
    .then((data) => {                // don't add a duplicate
      if (data == undefined) {
        console.log("new player added: " + play);
        return players.create(play, 0, 0, 0); 
      }
      return;
    })
  res.redirect('back');
  res.end();
  });

app.post("/submit-suggest", [
  check('name').isLength({ min: 3 }).trim().escape().withMessage('Name must be at least 3 chars long. First name last initial.'),
  check('trash').isLength({ min: 5 }).trim().escape().withMessage('Suggestion must be at least 5 chars long.')
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg})
  }
  let {name, trash}= req.body;
  name = name.toLowerCase().capitalize();
  console.log(name + " suggests: " + trash);
  trashcan.createTable() // create table if not already made
    .then(() => {
      return trashcan.create(name, trash) // add suggestion
    })
  res.redirect('back');
  res.end();
});

app.listen(8080);
console.log("8080 is the magic port");



// capitalize first letter of each word
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function hasDuplicate(w){
  return new Set(w).size !== w.length 
}