# Foosball Leaderboard

Who's the Esri Support Service foosball champ? Find out after these breif messages from our developer.

## Prerequisites

To run the web app you must have [Node](https://getbootstrap.com/) installed. With Node installed, navigate to the root folder of the app and type:

```
npm install
node server.js
```
Open a modern broweser and go to http://localhost:8080/

## TODO
To do list (Ask to be a collaborator and help me out!)
* validate data entered into the form
* make the form stay on the page after submission
* make the form values reset after submission
* connect the form to the database
* check if player exists, if not add them
* if player exists update their record
* add 'top 5' to report page
* create a tournament page

## Done List
completed items from TODO (started this list when I was halfway done)
* display leaderboard from database
* create tables and daos for games and suggestions


## Built With
* [Bootstrap](https://getbootstrap.com/) - Frontend
* [EJS](https://ejs.co/) - Embeded JavaScript
* [JQuery](https://jquery.com/) - JavaScript library
* [Node](https://nodejs.org/en/) - Backend
* [Express](https://expressjs.com/) - Web Framework
* [SQLite](https://www.sqlite.org/index.html) - Database

### Other Node Packages
* [bluebird](http://bluebirdjs.com/docs/getting-started.html) - Promises
* [body-parser](https://www.npmjs.com/package/body-parser) - Reading Forms
* [express-validator](https://express-validator.github.io/docs/) - Data Validation
