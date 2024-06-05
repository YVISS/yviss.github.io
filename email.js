

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

