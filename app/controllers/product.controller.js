const db = require("../models");
const Category = db.categories;
const Product = db.products;
// const User = db.users;
// const Role = db.roles;

// create Product
exports.create = (req, res) => {
  const product = {
    categoryId: req.body.categoryId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
  };
  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

// Test

// read all
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Product.findAll ({ where: condition })
    

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "ada error",
      });
    });
};

// update
exports.update = (req, res) => {
  const id = req.params.id;
  Product.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " Product sukses di update",
        });
      } else {
        res.send({
          message: "tidak bisa diupdate",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "server error",
      });
    });
};

// delete

exports.delete = (req, res) => {
  // req = request dan res = respon
  const id = req.params.id;
  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "berhasil delete",
        });
      } else {
        res.send({
          message: "tidak berhasil delete",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "tidak berhasil delete. server error",
      });
    });
};

// mencari data per id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: "data Product tdk ditemukan" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error Server" });
    });
};
