const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models").user;

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === " " || password === " ") {
    res
      .status(404)
      .send({ message: "Please provide a valid email address and password" });
  } else {
    const user = await User.findOne({ where: { email: email } }); //look for the user by email
    if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      //console.log("user.password ", user.password);
      //console.log("password test ", password);
      const userPassword = user.password;
      const result = bcrypt.compareSync(password, userPassword);
      //console.log("result test: ", result);
      if (result) {
        res.send({ jwt: toJWT({ userId: user.id }) });
      } else {
        res.status(404).send({ message: "Password was incorrect." });
      }
    }
  }
});

router.get("/test-auth", authMiddleware, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  });
});

module.exports = router;
