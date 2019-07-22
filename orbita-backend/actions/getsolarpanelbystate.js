const getSolarPanelByState = (req, res, db) =>{
    if(req.userstate !== req.params.state){
        return res.status(401).send({ 
            auth: false, message: 'O usuário não está autorizado a fazer essa requisição' 
        });
    }
    else{
        db.select('*').from('solar_data').where('state','=',req.userstate)
        .then(items => {
          if(items.length){
            res.json(items)
               
          } else {
            res.json({dataExists:"Não foi possível identificar o usuário"})
          }
        })
        .catch(err => res.status(400).json({dbError: err}))
    }
}
module.exports = {
    getSolarPanelByState
}