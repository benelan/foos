// trash_repo.js
// your suggestions go straight into the trashcan..
// but I pick out the items to recycle and use
class TrashRepo {
    constructor(dao) {
      this.dao = dao
    }
    // creates table if  it doesn't already exists
    createTable() {
      const sql = `
        CREATE TABLE IF NOT EXISTS trashcan (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          trash TEXT)`
      return this.dao.run(sql)
    }
    // adds to the table
    create(name, trash) {
        return this.dao.run(
          `INSERT INTO trashcan (name, trash)
            VALUES (?, ?)`,
          [name, trash])
      }
    // updates a row
    update(trashcan) {
        const { id, name, trash} = trashcan
        return this.dao.run(
          `UPDATE trashcan
          SET name = ?,
          trash = ?
          WHERE id = ?`,
          [name, trash, id]
        )
      }
      // deletes by trash id
      delete(id) {
        return this.dao.run(
          `DELETE FROM trashcan WHERE id = ?`,
          [id]
        )
      }
      // select * by trash id
      getById(id) {
        return this.dao.get(
          `SELECT * FROM trashcan WHERE id = ?`,
          [id])
      }
      // select *
      selectAll() {
        return this.dao.all(
          `SELECT * FROM trashcan`)
        }

    }
  
  module.exports = TrashRepo;