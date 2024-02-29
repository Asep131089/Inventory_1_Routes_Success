module.exports = (app) => {
  const categories = require("../controllers/category.controller.js");
  const products = require("../controllers/product.controller.js");
  const roles = require("../controllers/role.controller.js");
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

// Menu categori
  router.post("/categories", categories.create);                    // create 
  router.get("/categories", categories.findAll);                    // read all
  router.get("/categories/:id", categories.findOne);                 // find by id
  router.put("/categories/:id", categories.update);                  // update
  router.delete("/categories/:id", categories.delete);               // delete


  // Menu product
  router.post('/products', products.create);              // create Product
  router.put("/products/:id", products.update);           // update
  router.get("/products/:id", products.findOne);          // findOne
  router.delete("/products/:id", products.delete);        //delete
  router.get("/products", products.findAll);           // read all           ++++ Masih Server  Error  


  // Menu Roles
  router.post("/roles", roles.create);                         // create
  router.get("/roles", roles.findAll);                         // read all
  router.get("/roles/:id", roles.findOne);                      // find by id
  router.put("/roles/:id", roles.update);                       // update
  router.delete("/roles/:id", roles.delete);                    // delete


  // Menu Users
  router.post("/users", users.create);                    // create
  router.get("/users", users.findAll);                      // read all               ++++++ Masih server error 
  router.get("/users/:id", users.findOne);                // find by id
  router.put("/users/:id", users.update);                 // update
  router.delete("/users/:id", users.delete);              //delete

  app.use("/api/inventories", router);
  
};
