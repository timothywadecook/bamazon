
// .....
// Set the home page
// ....
const homePage = $('#nav').show(); 
$('.cartTable').hide();


const renderProductList = function(productList) {
    $('.productList').empty();
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


  
// getProductList(); 
  
  
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
};

const viewCart = function() {
    $('.productTable').hide();
    $('.cartTable').show();
};

const runAddToCart = function() {

};
  
  // All add-to-cart button... onClick => runAddToCart()
  $('#add-to-cart-btn').on('click', runAddToCart);
  // view cart button... onClick => productList.hide(), cart.show()
  $('#cartBtn').on('click', viewCart)
  // shop button... onClick => productList.show(),  cart.hide()
  $('#shopBtn').on('click', viewShop)