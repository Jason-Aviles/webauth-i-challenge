const express = require("express");
const session = require('express-session')
const projectRouter = require("./projects/auth-router");
const auth = require("./projects/user-router");
const server = express();

const sessionConfig = {
  name: "myguy",
  secret: "it stricly  business",
  cookie: {
    maxAge: 1000 * 30,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
};


server.use(express.json());

server.use(session(sessionConfig))

server.use("/api", projectRouter);
server.use("/auth", auth);
server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
