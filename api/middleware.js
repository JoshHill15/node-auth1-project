const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session")
const knexSessionStore = require("connect-session-knex")(session);
const dbConnection = require("../dbConfigure");

const sessionConfig = {
  name: "Log_in",
  secret: process.env.SESSION_SECRET || "confidential",
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new knexSessionStore({
      knex: dbConnection,
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 10
  })

};

module.exports = function(server) {
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use(session(sessionConfig))

};


