module.exports = function(connection, Sequelize) {

    const Product = connection.define('Product', {
        product_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        department_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        stock_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        cart_quantity: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
    });

    return Product;
}