const express = require('express');

const Projects = require('./project-modal');

const router = express.Router();

const bcrypt = require('bcryptjs');





  




  router.post('/reg',  (req, res) => {
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 14);
    
    credentials.password = hash;
    return Projects.add(credentials).then(data => res.json(data))
    
    
    });
    
    
    router.post('/login', (req, res) => {
      let { username, password } = req.body;
    
      Projects.findBy({ username })
        .first()
        .then(user => {
          // check that passwords match
          if (user && bcrypt.compareSync(password, user.password)) {
            req.session.username=username
            req.session.loggedIn=true
            res.status(200).json({ message: `Welcome ${user.username}!` });
          } else {
            // we will return 401 if the password or username are invalid
            // we don't want to let attackers know when they have a good username
            res.status(401).json({ message: 'Invalid Credentials' });
          }
        })
        .catch(error => {
          res.status(500).json(error);
        });
    });




    



module.exports = router;