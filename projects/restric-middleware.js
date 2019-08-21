



module.exports = (req, res, next) => {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    console.log(req.session.username)
    res.status(401).json({ message: 'you shall not pass!' });
  }
};
