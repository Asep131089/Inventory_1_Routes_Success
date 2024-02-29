const db = require("../models");
const Role = db.roles;
const User = db.users;
// const Category = db.categories;
// const Product = db.products;


// create
exports.create = (req, res) => {
    // get req
    const role = {
      name: req.body.name,
    };
  
    // create atau simpan ke database
  
    Role.create(role)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "terjadi error",
        });
      });
  };
  
  // read all
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Role.findAll({
      where: condition,
      include: [
        "USER",                                                                      // ini yang di cek 
  
        // {
        //   model: Product,
        //   as : "products",
        //   // attributes : ["id","name", "description", "price", "stock"],
        //   // through:{
        //   //   attributes:[]
        //   // }
        // }
      ],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "ada error",
        });
      });
  };
  
  
  
  // mencari data per id
  exports.findOne = (req,res)=>{
    const id = req.params.id
  
    Role.findByPk(id,
        {include:["USER"]}                                                          // ini yang di cek 
        ).then(data=>{
      if (data){
        res.send(data);
      }else {
        res.status(404).send(
          {message : "data Roles tdk ditemukan"}
        );
      }
  
    }).catch(err=>{
      res.status(500).send(
          {message : "error Server"}
      );
    })
  }
  
  // update
  exports.update = (req, res) => {
    const id = req.params.id;
    Role.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: " Roles sukses di update",
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
  }
  
  // delete
  
  exports.delete = (req,res)=>{       // req = request dan res = respon 
    const id = req.params.id
    Role.destroy({
        where: {id : id}
    }).then(num=> {
        if (num == 1){
            res.send({
                message : "berhasil delete"
            })
        }else {
            res.send({
                message : "tidak berhasil delete"
            })
        }
    }). catch(err =>{
        res.status(500).send({
            message : "tidak berhasil delete. server error"
        })
    })
  
  }