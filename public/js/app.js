
// .....
// Set the home page
// ....
const homePage = $('#nav').show(); 
$('.cartTable').hide();
$('#shopBtn').addClass('active')


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
        <input type="text" id="i${product.product_name}" class="form-control" placeholder="Qty">
        </div>
        <button type="submit" id="${product.product_name}"class="btn btn-primary add">Add</button>
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


  
const getProductList = function(){
$.get('/api/productList')
.then(function (productList){
    console.log(productList);
    render(productList);
})
};


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

  
getProductList(); 
  
  
//   const postArticle = function(event){
//     event.preventDefault();
  
//     console.log('clicked')
//     // Save the input in an object called 'article'
//     const article = {
//       title: $('#article-title').val().trim(),
//       body: $('#article-body').val().trim()
//     }
  
//     console.log('art', article)
//     // POST the article object to /api/articles
//     $.post('/api/articles', article)
//       .then(function(data) {
//         // After receiving a response, call getArticles
//         getArticles();
  
//         // Blank our inputs after POST
//         $('#article-title').val('');
//         $('#article-body').val('');
//       });
  
//   }

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

const runAddToCart = function(e) {
    e.preventDefault();
    console.log("add btn clicked");
    // save the input
    const product = e.target.id;
    console.log(product);
    const qty = $(`#i${product}`).val();
    console.log(qty);
    // get the product data .then check/update it 
    $.get(`/api/:${product}`)
    .then(function (productData){
        console.log(productData);
        // check and change 

        // render just this one 
    })
};

  
  // All add-to-cart button... onClick => runAddToCart()
  $('.productList').on('click', '.add', runAddToCart);
  // view cart button... onClick => productList.hide(), cart.show()
  $('#cartBtn').on('click', viewCart)
  // shop button... onClick => productList.show(),  cart.hide()
  $('#shopBtn').on('click', viewShop)