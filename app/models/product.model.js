module.exports = (sequelize,Sequelize)=>{
    const Product = sequelize.define("product",{
        name:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        price:{
            type: Sequelize.STRING
        },
        stock:{
            type: Sequelize.STRING
        }
    });
    return Product;
};