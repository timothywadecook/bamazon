const render = function(productList){
    $('#products').empty();
    $('#cart').empty();
    
    for (let i = 0; i < productList.length; i++){
      $('#products').append(`<div><h3>${productList[i].product_name}</h3><p>${productList[i].department_name}</p><p>Price: $${productList[i].price}</p><p>QTY: ${productList[i].stock_quantity}</p>
      <form>
      <input id="qty-req" placeholder="Amount" />
      <button id="add-to-cart">Submit</button>
      </form>
      </div>`);
    }
};
  
const getProducts = function(){
$.get('/api/productList')
.then(function (productList){
    console.log(productList);
    render(productList);
})
};

// there will be a duplicate of the above for rendering the shopping cart?... no should render at the same time. SPA. click should hide() 

  
getProducts(); // get product list and render on page 
  
  
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
    // run get products... await get 
    $('#cart').hide();
    $('#products').show();
};

const viewCart = function() {
    $('#products').hide();
    $('#cart').show();

};

const runAddToCart = function() {

};
  
  // All add-to-cart button... onClick => runAddToCart()
  $('#add-to-cart-btn').on('click', runAddToCart);
  // view cart button... onClick => productList.hide(), cart.show()
  $('#view-cart').on('click', viewCart)
  // shop button... onClick => productList.show(),  cart.hide()
  $('#view-shop').on('click', viewShop)