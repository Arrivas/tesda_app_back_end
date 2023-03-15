const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// routes
const userRoute = require("../controller/user");
const authRoute = require("../controller/auth");

// user
app.use("/user", userRoute);

// auth
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.json("hello from tesda back-end");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/tesdaDB", {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("db error ", err));

app.listen(port, () =>
  console.log(`listening on port http://localhost:${port}`)
);
