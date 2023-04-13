const router = require("express").Router();
const Borrow = require("../models/borrowModel");
const Image = require("../models/imageModel");

router.get("/get/all", async (req, res) => {
  try {
    const borrowAll = await Borrow.find({});
    res.json(borrowAll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get/one/:id", async (req, res) => {
  Borrow.findById(req.params.id)
    .exec()
    .then(async (data) => {
      return res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

router.post("/new", async (req, res) => {
  try {
    const newBorrow = await Borrow.create(req.body);
    res.json(newBorrow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // Borrow.find({ propertyNo: newBorrow.propertyNo })
  //   .exec()
  //   .then(async (data) => {
  //     if (data.length > 0)
  //       return res.status(400).json({
  //         message: `property no. ${newBorrow.propertyNo} already exists in the database`,
  //       });
  //     await newBorrow.save();
  //     return res.status(200).json(newBorrow);
  //   })
  //   .catch((error) => res.status(500).json({ message: error.message }));
});

router.put("/update/:id", async (req, res) => {
  const borrow = await Borrow.findByIdAndUpdate(req.params.id, req.body);
  try {
    return res.json({ message: "updated", borrow });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Borrow.findByIdAndDelete(req.params.id);
    res.json({ message: "item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/delete/multiple", async (req, res) => {
  try {
    await Borrow.deleteMany({
      _id: { $in: req.body.toDelete },
    });
    await Image.deleteMany({
      _id: { $in: req.body.toDeleteImg },
    });
    res.json({ message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
