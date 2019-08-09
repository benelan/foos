// games_repo.js

class GameRepo {
    constructor(dao) {
      this.dao = dao
    }
    // creates table if  it doesn't already exists
    createTable() {
      const sql = `
        CREATE TABLE IF NOT EXISTS games (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          t1p1 TEXT,
          t1p2 TEXT.
          t2p1 TEXT,
          t2p2 TEXT,
          t1wins INTEGER,
          t2wins INTEGER,
          date TEXT)`
      return this.dao.run(sql)
    }
    // adds to the table
    create(t1p1, t1p2, t2p1, t2p2, t1wins, t2wins, date) {
        return this.dao.run(
          `INSERT INTO games (t1p1, t1p2, t2p1, t2p2, t1wins, t2wins, date)
            VALUES (?, ?, ?, ?, ?)`,
          [t1p1, t1p2, t2p1, t2p2, t1wins, t2wins, date])
      }
    // updates a row
    update(games) {
        const { id, t1p1, t1p2, t2p1, t2p2, t1wins, t2wins, date} = games
        return this.dao.run(
          `UPDATE games
          SET name = ?,
          points = ?,
          wins_round = ?,
          wins_series = ?,
          played_series = ?
          WHERE id = ?`,
          [t1p1, t1p2, t2p1, t2p2, t1wins, t2wins, date, id]
        )
      }
      // deletes by game id
      delete(id) {
        return this.dao.run(
          `DELETE FROM games WHERE id = ?`,
          [id]
        )
      }
      // select * by game id
      getById(id) {
        return this.dao.get(
          `SELECT * FROM games WHERE id = ?`,
          [id])
      }
      // select *
      selectAll() {
        return this.dao.all(
          `SELECT * FROM games`)
        }

    }
  
  module.exports = GameRepo;