
// .....
// Set the home page and navigation
// ....
const homePage = $('#nav').show(); 
$('.cartTable').hide();
$('#shopBtn').addClass('active')

const viewShop = function() { 
    $('.cartTable').hide();
    $('.productTable').show();
    $('.nav-link').removeClass('active');
    $('#shopBtn').addClass('active')
};

const viewCart = function() {
    $('.productTable').hide();
    $('.cartTable').show();
    $('.nav-link').removeClass('active');
    $('#cartBtn').addClass('active')
};
const cachedProductList = [];


// .....
// Render lists
// ....

const renderProductList = function(productList) {
    $('.productList').empty();
    productList.forEach(function(product) {
        $('.productList').append(`
        <tr>
        <th scope="row">${product.product_name}</th>
        <td>${product.department_name}</td>
        <td>$${product.price}</td>
        <td>${product.stock_quantity}</td>
        <td>
        <div class="form-row">
        <div class="col-2">
        <input type="text" id="i${product.id}" class="form-control" placeholder="Qty">
        </div>
        <button type="submit" id="${product.id}"class="btn btn-primary add">Add</button>
        </div>
        </td>
        </tr>
        `)
    })
};

const renderCart = function(cartList) {
    $('.cartList').empty();
    cartList.forEach(row => {
        $('.cartBody').append(`
        <tr>
        <th scope="row">${product.product_name}</th>
        <td>${product.price}</td>
        <td>${product.cart_quantity}</td>
        <td>${removebutton}</td>
        </tr>
        `);
    })
}




// .....
// Get data from API
// ....
  
const getProductList = function(){
$.get('/api/productList')
.then(function (productList){
    console.log(productList);
    cachedProductList = productList;
    renderProductList(productList);
})
};

// when add to cart is clicked
// prevent default
// store the request number in a variable called qty
// if qty is less than of equal to stock_quantity 
const runAddToCart = function(e) {
    e.preventDefault();
    const productId = e.target.id;
    const qty = $(`#i${productId}`).val();
    console.log('does qty work?', qty + "\n\n");
    console.log('does this work? = ',this.stock_quantity);
    // get the product data .then check/update it 
    $.get(`/api/:${product}`)
    .then(function (productData){
        console.log(productData);
        // check and change 

        // render just this one 
    })
};



// .....
// Add event listeners
// ....
  
  // All add-to-cart button... onClick => runAddToCart()
  $('.productList').on('click', '.add', runAddToCart);
  // view cart button... onClick => productList.hide(), cart.show()
  $('#cartBtn').on('click', viewCart)
  // shop button... onClick => productList.show(),  cart.hide()
  $('#shopBtn').on('click', viewShop)




// .....
// A few functions that may be useful
// ....

const checkStockQty = function(qty) { // takes in a qty and returns true if product qty is >= requested qty
    return qty <= this.stock_quantity;
};
const addQtyToCart = function(qty) { // takes a qty and 
        this.stock_quantity -= qty;
        this.cart_quantity += qty;
};
const checkCartQty = function(qty) {
    return qty <= this.cart_quantity;
};
const removeQtyFromCart = function(qty) {
    this.stock_quanity += qty;
    this.cart_quantity -= qty;
};
const cartSubTotal = function() {
    return this.cart_quantity * this.price;
};


// .....
// Initialize the data list on load
// ....
getProductList(); 