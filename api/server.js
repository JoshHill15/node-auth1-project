const express = require("express");
const server = express();
server.use(express.json());
const bcrypt = require("bcryptjs");

const configureMiddleware = require("./middleware");
configureMiddleware(server);

const Users = require("./model");

server.get("/api/users", async (req, res) => {
  const users = await Users.find();
  if (users) res.status(200).json(users);
  else res.status(500).json({ error: "can't find users" });
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const users = await Users.findBy(id);
  if (users) res.status(200).json(users);
  else res.status(500).json({ error: "can't find user" });
});

server.post("/api/register", async (req, res) => {
  try {
    const user = await Users.add(req.body);
    if (user) {
      user.password = bcrypt.hashSync(user.password, 9);
      res.status(201).json(user);
    }
  } catch {
    res.status(500).json({ error: "can't add user" });
  }
});

server.post("/register", (req, res) => {
  let { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 8);
  Users.add({ password: hash, username })
    .then(newUser => {
      console.log("new",newUser)
      res.status(201).json(newUser);
    })
    .catch(error => {
      console.log("err", error);
      res.status(500).json({ error: "can't add user" });
    });
});

server.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findBy({username});
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      console.log("user", user, password, user.password);

      res.status(401).json({ error: "invalid creds" })
    }
  } catch {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

server.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
      .first()
      .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
              // if (user) {
              // compare().then(match => {
              //   if (match) {
              //     // good password
              //   } else {
              //     // they don't match
              //   }
              // }).catch()
              res.status(200).json({ message: `Welcome ${user.username}!` });
          } else {
              res.status(401).json({ message: "Invalid Credentials" });
          }
      })
      .catch(error => {
          console.log(error)
          res.status(500).json({error: error});
      });
});


module.exports = server;
