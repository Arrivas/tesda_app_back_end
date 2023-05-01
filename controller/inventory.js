const router = require("express").Router();
const Inventory = require("../models/inventoryModel");
const Image = require("../models/imageModel");

router.get("/get/all", async (req, res) => {
  try {
    const inventoryAll = await Inventory.find({});
    res.json(inventoryAll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get/one/:id", async (req, res) => {
  Inventory.findById(req.params.id)
    .exec()
    .then(async (data) => {
      return res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

router.post("/new", async (req, res) => {
  try {
    const { propertyNo } = req.body;
    const existingInventory = await Inventory.findOne({ propertyNo });

    if (existingInventory) {
      res.status(400).json({
        message: `inventory with ${propertyNo} already exists`,
      });
      return;
    }

    const newInventory = await Inventory.create(req.body);
    res.json(newInventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body);
  try {
    return res.json({ message: "updated", inventory });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/delete/multiple", async (req, res) => {
  try {
    await Inventory.deleteMany({
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

router.post("/get/stats", async (req, res) => {
  try {
    const inventoryAll = await Inventory.find({});
    const year = req.body.year;
    const filteredObjectsByMonth = [];

    for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
      const monthName = new Date(`${monthNumber} 1, ${year}`).toLocaleString(
        "default",
        { month: "long" }
      );
      const filteredObjects = inventoryAll.filter((obj) => {
        const purchaseDate = new Date(obj.purchaseDate);
        return (
          purchaseDate.getMonth() + 1 === monthNumber &&
          purchaseDate.getFullYear() === year
        );
      });

      const sspCount = filteredObjects.filter(
        (obj) => obj.docType === "ssp"
      ).length;

      const inventory101Count = filteredObjects.filter(
        (obj) => obj.docType === "101"
      ).length;

      filteredObjectsByMonth.push({
        month: monthName,
        total: filteredObjects.length,
        ssp: sspCount,
        101: inventory101Count,
        objects: filteredObjects.map((obj) => ({
          condition: obj.condition,
          _id: obj._id,
          qty: obj.qty,
          equipment: obj.equipment,
          receiver: obj.receiveBy,
          propertyNo: obj.propertyNo,
          equipment: obj.equipment,
          type: obj.docType,
          unit: obj.unit,
          amount: obj.amount,
          classification: obj.classification,
        })),
      });
    }
    res.json(filteredObjectsByMonth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
