
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
let cachedProductList = [];
let cachedCartList = [];

const successAlert = function(action) {
    $('.main').prepend( `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Holy guacamole!</strong> You just ${action}.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`);
};
const failureAlert = function(action) {
    $('.main').prepend( `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Oops!</strong> You just ${action}.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`);
};


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
        <div class="col-3">
        <input type="text" id="i${product.id}" class="form-control" placeholder="Qty">
        </div>
        <button type="submit" id="${product.id}"class="btn btn-primary add">Add</button>
        </div>
        </td>
        </tr>
        `)
    })
};

const renderCartList = function(cartList) {
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

const getCartList = function(){
    $.get('/api/cart')
    .then(function (cartList){
        console.log(cartList);
        cachedCartList = cartList;
        renderCartList(cartList);
})
};


// when add to cart is clicked
// prevent default
// store the request number in a variable called qty
// if qty is less than of equal to stock_quantity 
const runAddToCart = function(e) {
    e.preventDefault();
    const productId = e.target.id;
    const qty = $(`#i${productId}`).val(); // store input field
    $(`#i${productId}`).val(''); // empty input field
    const productData = cachedProductList.find(prod => prod.id === productId);
    console.log('productData should be object =', productData);
    console.log('stock quanity should be number = ',productData.stock_quantity)
    const stockQty = productData.stock_quantity;
    if (qty <= stockQty) { // if enough stock add to cart then remove from stock 
        productData.cart_quantity += qty;
        productData.stock_quantity -= qty;
        // then post this new productData to the db and then call getProductList again.
        $.put(`/api/productList/${productData.product_name}`, productData)
        .then((updatedProduct) => {
            console.log(updatedProduct);
            successAlert('Added to your cart!');
            getProductList();
            getCartList();
        })
    } 
    else { 
        failureAlert('Try requesting a smaller quantity');
    }
    


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
// Initialize the data list on load
// ....
getProductList(); 
getCartList();