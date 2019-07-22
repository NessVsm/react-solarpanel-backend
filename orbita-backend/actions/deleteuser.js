 const deleteUser = (req, res, db) => {
    const { id } =  req.params.id
    db('users').where('id','=', req.params.id).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'Não foi possível deletar o usuário'}))
  }

  module.exports = {
    deleteUser
  }