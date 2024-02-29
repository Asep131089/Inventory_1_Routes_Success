const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);

// membuat relasi one to many tabel Categories dengan tabel product
db.categories.hasMany(db.products, { as: "PRODUCT" });
db.products.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "categori",
});

// membuat relasi one to many tabel users dengan tabel roles

db.roles.hasMany(db.users, {as : "USER"});                                           //  ini yang di cek
db.users.belongsTo(db.roles, {
    foreignKey : "roleId",
    as : "role"
});

module.exports = db;
