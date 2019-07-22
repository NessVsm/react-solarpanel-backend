const getUsers = (req, res, db) => {
    db.select('*').from('users')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'Não existem usuários cadastrados'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'Não foi possível processar sua requisição'}))
  }
  
  module.exports = {
    getUsers
  }