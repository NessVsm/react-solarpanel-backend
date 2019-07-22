const bcrypt = require('bcryptjs');
const saltRounds = 10;

const postUser = (req, res, db) => {
    const { email, state, zipcode, name, username, password} = req.body

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, password) {
          db('users').insert({email, state, zipcode, name, username, password})
          .returning('*')
          .then(item => {
            res.json(item)
          })
          .catch(err => res.status(400).json({dbError:  err}))

        });


    });
     
  }

  module.exports = {
    postUser
  }