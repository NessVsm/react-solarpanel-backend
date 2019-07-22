const getAllSolarPanel = (req, res, db) =>{
    db.select('*').from('solar_data')
    .then(items => {
        if(items.length){
        res.json(items)
        } else {
        res.json({dataExists:"Não foi possível encontrar painéis solares"})
        }
    })
    .catch(err => res.status(400).json({dbError: err}))
}

module.exports = {
    getAllSolarPanel
}