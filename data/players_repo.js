// players_repo.js

class PlayerRepo {
    constructor(dao) {
      this.dao = dao
    }
    // creates table if  it doesn't already exists
    createTable() {
      const sql = `
        CREATE TABLE IF NOT EXISTS players (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          wins_round INTEGER DEFAULT 0,
          wins_series INTEGER DEFAULT 0,
          played_series INTEGER DEFAULT 0)`
      return this.dao.run(sql)
    }
    // adds to the table
    create(name, wins_round, wins_series, played_series) {
        return this.dao.run(
          `INSERT INTO players (name, wins_round, wins_series, played_series)
            VALUES (?, ?, ?, ?)`,
          [name, wins_round, wins_series, played_series])
      }
    // updates a row
    update(id, wins_round, wins_series, played_series) {
        return this.dao.run(
          `UPDATE players
          SET wins_round = ?,
          wins_series = ?,
          played_series = ?
          WHERE id = ?`,
          [wins_round, wins_series, played_series, id]
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

      // select * by player id
      getByName(name) {
        return this.dao.get(
          `SELECT * FROM players WHERE name = ?`,
          [name])
      }
      // select *
      selectAll() {
        return this.dao.all(
          `SELECT * FROM players`)
        }

        // select *
      selectName() {
        return this.dao.all(
          `SELECT name FROM players`)
        }

    }
  
  module.exports = PlayerRepo;