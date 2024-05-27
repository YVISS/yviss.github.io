<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['number'];
    $address = $_POST['address'];
    
    $to = 'laombac14@gmail.com'; // Enter your email address here
    $subject = 'New Order';
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    $body = "Name: $name\n
            Address: $address\n
            Email: $email\n
            Mobile Number: $mobile\n
            ";

    if (mail($to, $subject, $body, $headers)) {
        echo 'Your order has been sent successfully!';
    } else {
        echo 'There was a problem sending your order. Please try again later.';
    }
}
?>
