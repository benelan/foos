const Promise = require('bluebird')
const AppDAO = require('./dao')
const PlayerRepo = require('./players_repo')

function main() {
  const dao = new AppDAO('./database.sqlite3')
  const playerRepo = new PlayerRepo(dao)

  playerRepo.createTable()
    .then(() => {
      const ps = [

        {
          name: player,
          wins_round: 0,
          wins_series: 0,
          played_series: 0
        }
      ]
      console.log('adding players');
      return Promise.all(ps.map((p) => {
        const { name, wins_round, wins_series, played_series } = p
        return playerRepo.create(name, wins_round, wins_series, played_series)
      }))
    })
    .catch((err) => {
      console.log('Error: ')
      console.log(JSON.stringify(err))
    })
}

main()