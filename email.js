let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listorderHTML = document.querySelector('.shop-box');
let listorder = [];

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
    alert(1);
  }
})

const initApp = () => {
  //get data from json
  fetch('products.json')
  .then(response => response.json())
  .then(data => {
    listorder = data;
    addDataToHTML();
  })
}
initApp();



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



