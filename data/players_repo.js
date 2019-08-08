// players_repo.js

class PlayerRepo {
    constructor(dao) {
      this.dao = dao
    }
  
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

    create(name, points, wins_round, wins_series, played_series) {
        return this.dao.run(
          `INSERT INTO players (name, points, wins_round, wins_series, played_series)
            VALUES (?, ?, ?, ?, ?)`,
          [name, points, wins_round, wins_series, played_series])
      }

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

      delete(id) {
        return this.dao.run(
          `DELETE FROM players WHERE id = ?`,
          [id]
        )
      }

      getById(id) {
        return this.dao.get(
          `SELECT * FROM players WHERE id = ?`,
          [id])
      }

      selectAll() {
        return this.dao.get(
          `SELECT * FROM players`)
        }

    }
  
  module.exports = PlayerRepo;