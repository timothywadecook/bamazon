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

        checkStockQty: function(qty) { // takes in a qty and returns true if product qty is >= requested qty
            return qty <= this.stock_quantity;
        },
        addQtyToCart: function(qty) { // takes a qty and 
                this.stock_quantity -= qty;
                this.cart_quantity += qty;
        },
        checkCartQty: function(qty) {
            return qty <= this.cart_quantity;
        },
        removeQtyFromCart: function(qty) {
            this.stock_quanity += qty;
            this.cart_quantity -= qty;
        },
        cartSubTotal: function() {
            return this.cart_quantity * this.price;
        }
    });

    return Product;
}