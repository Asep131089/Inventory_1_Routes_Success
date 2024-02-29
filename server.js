const express = require("express");
const cors = require("cors");
const app = express();

// setting origin cors
var corsoption = {
  origin: "http://localhost:4000",
};
app.use(cors(corsoption));

// parse request content type application /json
app.use(express.json());
// parse request application/x-www-force-urlencoded
app.use(express.urlencoded({ extended: true }));

// sync database
const db = require("./app/models");
db.sequelize
  .sync({force:false})
  .then(() => {
    console.log("sync db");
  })
  .catch((err) => {
    console.log(`failed to sync karena ${err.message}`);
  });

//route /
app.get("/", (req, res) => {
  res.json({
    message: "selamat datang di inventories ini nodemon",
  });
});

//route inventories
require("./app/routes/inventory.routes")(app);

// route role

// require("./app/routes/role.routes")(app);

// setting port listen
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
