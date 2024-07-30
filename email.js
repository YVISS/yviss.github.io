let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listorderHTML = document.querySelector('.shop-box');
let listeditemsHTML = document.querySelector('.listeditems');
let iconCartSpan = document.querySelector('.icon-cart span')

let listorder = [];
let carts = [];




//cartfunctions

iconCart.addEventListener('click', () => {
  body.classList.toggle('showcart');
})

closeCart.addEventListener('click', () => {
  body.classList.toggle('showcart');
})

const addDataToHTML = () => {
  listorderHTML.innerHTML = '';
  if(listorder.length > 0){
    listorder.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.dataset.id = product.id;
        newProduct.innerHTML = `
        <div class="card">
            <div class="card-image">
              <button class="addtocart">Add to Cart</button>
              <img src="${product.image}" alt="" />
            </div>
            <div class="card-body">
              <span class="coffee-type">${product.type}</span>
              <label class="cash">&#8369 ${product.price}</label><!--#8369-->
              <h3>${product.name}</h3>
              <label for="">${product.label}</label>
            </div>
          </div>`;
          listorderHTML.appendChild(newProduct);
    });
  }
}

listorderHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if(positionClick.classList.contains('addtocart')){
    let productElement = positionClick.closest('.item'); // Find the closest ancestor with the 'item' class
    let product_id = productElement.dataset.id;
    addToCart(product_id);
  }
}) 

const addToCart= (product_id) => {
  let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id); 
  if(carts.length <= 0){
    carts = [{
      product_id: product_id,
      quantity: 1
    }]
  }else if(positionThisProductInCart < 0 ){
    carts.push({
      product_id: product_id,
      quantity: 1
    })
  }else{
    carts[positionThisProductInCart].quantity += 1;  
  }
  addCartToHTML();
  addToCartMemory();
}

const addToCartMemory = () => {
  localStorage.setItem('cart', JSON.stringify(carts));
}


const addCartToHTML = () =>{
  listeditemsHTML.innerHTML = '';
  let totalQuantity = 0;
  if(carts.length > 0){
    carts.forEach(cart => {
      totalQuantity = totalQuantity + cart.quantity;
      let newCart = document.createElement('div');
      newCart.classList.add('listed__orders');
      newCart.dataset.id = cart.product_id;
      let positionProduct = listorder.findIndex((value) => value.id == cart.product_id);
      let info = listorder[positionProduct];
      newCart.innerHTML = `
           <div class="listed__image">
              <img src="${info.image}" alt="">
            </div>
            <div class="listed__name">
              ${info.name}
            </div>
            <div class="listed__price">
              &#8369 ${info.price * cart.quantity}
            </div>
            <div class="listed__quantity">
              <span class="minus">-</span>
              <span>${cart.quantity}</span>
              <span class="plus">+</span>
            </div>
        `;
      listeditemsHTML.appendChild(newCart);
    })
  }
  iconCartSpan.innerText = totalQuantity;
}

listeditemsHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
    let product_id = positionClick.closest('.listed__orders').dataset.id; 
    let type = 'minus';
    if (positionClick.classList.contains('plus')) {
      type = 'plus';
    }
    changeQuantity(product_id, type);
  }
});

const changeQuantity = (product_id, type) => {
  let postionItemInCart = carts.findIndex((value) => value.product_id == product_id);
  if (postionItemInCart >= 0) {
    switch (type) {
      case 'plus':
        carts[postionItemInCart].quantity = carts[postionItemInCart].quantity +  1;
        break;
    
      default:
        let valueChange = carts[postionItemInCart].quantity - 1;
        if(valueChange > 0){
          carts[postionItemInCart].quantity = valueChange;
        }else{
          carts.splice(postionItemInCart, 1);
        }
        break;
    }
  }
  addToCartMemory();
  addCartToHTML();
}

const initApp = () => {
  //get data from json
  fetch('products.json')
  .then(response => response.json())
  .then(data => {
    listorder = data;
    addDataToHTML();

    //get from memory

    if(localStorage.getItem('cart')){
      carts = JSON.parse(localStorage.getItem('cart'));
      addCartToHTML();
    }
  })
}
initApp();

//close the website
window.addEventListener('beforeunload', () => {
  localStorage.removeItem('cart'); // Remove a specific item
  // localStorage.clear(); // Uncomment to clear all items
});




document.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    }
    else {
      header.classList.remove('scrolled');
    }
  });



// Initialize EmailJS
(function(){
  emailjs.init("FiddlelityCafe");
})();

// Handle form submission
document.getElementById('order-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

   // Extract form data
   const formData = new FormData(this);
   const formDataObject = {};
   formData.forEach((value, key) => {
     formDataObject[key] = value;
   });

    // Construct parameters object with form data
    const parameters = {
      'from_name': formDataObject['name'],
      'from_address': formDataObject['address'],
      'from_orders': formDataObject['orders'],
      'from_email': formDataObject['email'],
      'from_mobile': formDataObject['mobile'],
      'order_details': JSON.stringify(formDataObject['items']) // Convert items array to string
      // Add other parameters as needed
    };

  // Send the form data using EmailJS
  emailjs.sendForm('service_test_cafe', 'template_ordering', parameters)
      .then(function() {
          alert('Email sent successfully!');
      }, function(error) {
          alert('Failed to send email. Please try again later.');
      });
});



