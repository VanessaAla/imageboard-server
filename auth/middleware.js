const User = require("../models").user;
const { toData } = require("./jwt");

async function auth(req, res, next) {
  // 1. check for authorization header and "split" it.
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");

  //if authorization header is there, auth type is Bearer and we have something at auth[1] we proceed to check the token.
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const user = await User.findByPk(data.userId); //Use the value returned from "toData()" to look for that user in your database with User.findByPk
      if (!user) {
        res.status(404).send("No user found");
      } else {
        req.user = user; //If user is found, set it to `req.user = user` and call next();
        next();
      }
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      });
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
}

module.exports = auth;
