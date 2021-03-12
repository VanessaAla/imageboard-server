const { Router } = require("express");
const { toData } = require("../auth/jwt");
const Image = require("../models").image;

const router = new Router();

router.get("/", async (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 500); //limit indicates how many results are on a page.
  const offset = req.query.offset || 0; //how many results to skip
  try {
    const result = await Image.findAndCountAll({ limit, offset });
    res.send({ images: result.rows, total: result.count });
  } catch (error) {
    next(error);
  }
});

//read my images:
/*router.get("/", async (req, res, next) => {
try {
const images = await Image.findAll();
 res.json(images);
 } catch (e) {
 next(e);
 }
});*/

router.post("/", async (req, res, next) => {
  try {
    const image = await Image.create(req.body);
    res.json(image);
  } catch (e) {
    next(e);
  }
});

//get one specific image by its Id:
/*router.get("/:imageId", async (req, res, next) => {
  try {
    const imageId = parseInt(req.params.imageId);
    const specificImage = await Image.findByPk(imageId);
    res.json(specificImage);
  } catch (e) {
    next(e);
  }
});*/

router.get("/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      console.log(auth);
      const data = toData(auth[1]);
      console.log(data);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
    const allImages = await Image.findAll();
    res.json(allImages);
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

module.exports = router;
