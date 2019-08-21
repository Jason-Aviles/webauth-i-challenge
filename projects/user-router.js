const express = require('express');

const Projects = require('./project-modal');

const router = express.Router();

const bcrypt = require('bcryptjs');

const 
restricted = require('./restric-middleware')


router.get('/',
restricted,  (req, res) => {
  
return Projects.find().then(data => res.json(data))


});



  









module.exports = router;