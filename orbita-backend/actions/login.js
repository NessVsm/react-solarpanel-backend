require("dotenv-safe").load();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


const login = (req, res, db) => {
    const { email, password} = req.body

    if (!email || !password){
        res.status(400).send('Senha e email são obrigatórios')
        return
    }
    else{
        db.select('*').from('users').where('email','=', req.body.email)
        .then(items => {
            if(items.length){
                bcrypt.compare(req.body.password,items[0].password).then((result)=>{
                    if(result){
                        const id = items[0].id;
                        const user_state = items[0].state;
                        var token = jwt.sign({ id:id, state: user_state}, process.env.SECRET, {
                            expiresIn: 300, // expira em 5min
                        });
                        res.status(200).send({ 
                            auth: true, token: token
                        });
                       
                        res.send(token)

                    } else {
                        res.json("O usuário e senha não correspondem")
                    }
                  })
                  .catch((err)=>console.error(err))
            } else {
            res.json({dataExists: 'Usuário não encontrado'})
            }
        })
      .catch(err => res.status(400).json({dbError: err}))
     
    }
    
}
  module.exports = {
    login
  }