const { Router } = require("express");
const Image = require("../models").image;

const router = new Router();

router.get("/", async (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 500); //limit indicates how many results are on a page.
  const offset = req.query.offset || 0; ////how many results to skip
  try {
    const result = await Image.findAndCountAll({ limit, offset });
    res.send({ images: result.rows, total: result.count });
  } catch (error) {
    next(error);
  }
});

//read my images:
router.get("/", async (req, res, next) => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const image = await Image.create(req.body);
    res.json(image);
  } catch (e) {
    next(e);
  }
});

//get one specific image by its Id:
router.get("/:imageId", async (req, res, next) => {
  try {
    const imageId = parseInt(req.params.imageId);
    const specificImage = await Image.findByPk(imageId);
    res.json(specificImage);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
