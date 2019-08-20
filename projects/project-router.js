const express = require('express');

const Projects = require('./project-modal');

const router = express.Router();

const bcrypt = require('bcryptjs');

router.get('/projects',  (req, res) => {
return Projects.find().then(data => res.json(data))


});



  




  router.post('/reg',  (req, res) => {
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 14);
    
    credentials.password = hash;
    return Projects.add(credentials).then(data => res.json(data))
    
    
    });
    
    
    router.post('/login',restricted, (req, res) => {
      let { username, password } = req.body;
    
      Projects.findBy({ username })
        .first()
        .then(user => {
          // check that passwords match
          if (user && bcrypt.compareSync(password, user.password)) {
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

    function restricted(req, res, next) {
      // we'll read the username and password from headers
      // the client is responsible for setting those headers
      const { username, password } = req.headers;
    
      // no point on querying the database if the headers are not present
      if (username && password) {
       Projects.findBy({ username })
          .first()
          .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
              next();
            } else {
              res.status(401).json({ message: 'Invalid Credentials' });
            }
          })
          .catch(error => {
            res.status(500).json({ message: 'Unexpected error' });
          });
      } else {
        res.status(400).json({ message: 'No credentials provided' });
      }
    }


module.exports = router;