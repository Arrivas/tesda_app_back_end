const router = require("express").Router();
const multer = require("multer");
const Image = require("../models/imageModel");

const upload = multer();

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      name: req.file.originalname,
      contentType: req.file.mimetype,
      image: req.file.buffer,
    });

    const savedImage = await newImage.save();

    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      savedImage._id
    }`;

    res.json({ image: { _id: savedImage._id, imageUrl } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading image");
  }
});

router.post("/upload/edit/:id", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      name: req.file.originalname,
      contentType: req.file.mimetype,
      image: req.file.buffer,
    });

    await Image.findByIdAndDelete(req.params.id);

    const savedImage = await newImage.save();

    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      savedImage._id
    }`;

    res.json({ image: { _id: savedImage._id, imageUrl } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading image");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      res.status(404).send("Image not found");
    } else {
      res.set("Content-Type", image.contentType);
      res.send(image.image);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching image");
  }
});

module.exports = router;
