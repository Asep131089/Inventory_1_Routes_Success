const db = require("../models");
const User = db.users;
const Role = db.roles;
// // const Category = db.categories;
// // const Product = db.products;

// create User
exports.create = (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    roleId: req.body.roleId,
  };
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

// read all
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "ada error",
      });
    });
};

//   // mencari data per id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: "data Users tdk ditemukan" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error Server" });
    });
};

// update
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " category sukses di update",
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

//   // delete

exports.delete = (req, res) => {
  // req = request dan res = respon
  const id = req.params.id;
  User.destroy({
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
