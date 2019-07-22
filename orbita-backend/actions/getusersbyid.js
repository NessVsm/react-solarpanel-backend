const getUsersById = (req, res, db) => {
    db.select('*').from('users').where('id','=', req.params.id)
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'Usuário não encontrado'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'Não foi possível processar sua requisição'}))
  }
  
  module.exports = {
    getUsersById
  }