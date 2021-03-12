const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").user;

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === " " || password === " ") {
    res
      .status(404)
      .send({ message: "Please provide a valid email address and password" });
  } else {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      const userPassword = user.password;
      const result = bcrypt.compareSync(password, userPassword);
      if (result) {
        res.send({ jwt: toJWT({ userId: user.id }) });
      } else {
        res.status(404).send({ message: "Password was incorrect." });
      }
    }
  }
});

module.exports = router;
