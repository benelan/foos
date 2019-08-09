// players_repo.js

class PlayerRepo {
    constructor(dao) {
      this.dao = dao
    }
    // creates table if  itdoesn't already exists
    createTable() {
      const sql = `
        CREATE TABLE IF NOT EXISTS players (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          points INTEGER DEFAULT 0,
          wins_round INTEGER DEFAULT 0,
          wins_series INTEGER DEFAULT 0,
          played_series INTEGER DEFAULT 0)`
      return this.dao.run(sql)
    }
    // adds to the table
    create(name, points, wins_round, wins_series, played_series) {
        return this.dao.run(
          `INSERT INTO players (name, points, wins_round, wins_series, played_series)
            VALUES (?, ?, ?, ?, ?)`,
          [name, points, wins_round, wins_series, played_series])
      }
    // updates a row
    update(players) {
        const { id, name, points, wins_round, wins_series, played_series} = players
        return this.dao.run(
          `UPDATE players
          SET name = ?,
          points = ?,
          wins_round = ?,
          wins_series = ?,
          played_series = ?
          WHERE id = ?`,
          [name, points, wins_round, wins_series, played_series]
        )
      }
      // deletes by player id
      delete(id) {
        return this.dao.run(
          `DELETE FROM players WHERE id = ?`,
          [id]
        )
      }
      // select * by player id
      getById(id) {
        return this.dao.get(
          `SELECT * FROM players WHERE id = ?`,
          [id])
      }
      // select *
      selectAll() {
        return this.dao.all(
          `SELECT * FROM players`)
        }

    }
  
  module.exports = PlayerRepo;