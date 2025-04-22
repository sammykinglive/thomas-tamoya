<?php
header('Content-Type: application/json');

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = trim($_POST["phone"]);
    $service = trim($_POST["service"]);
    $message = trim($_POST["message"]);
    
    // Validate data
    $errors = [];
    if (empty($name)) $errors[] = "Name is required";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required";
    if (empty($service)) $errors[] = "Service selection is required";
    if (empty($message)) $errors[] = "Message is required";
    
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(["success" => false, "errors" => $errors]);
        exit;
    }
    
    // Set recipient and subject
    $recipient = "samuelviolet@gmail.com";
    $subject = "New Booking Request: $service";
    
    // Build email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    $email_content .= "Service: $service\n\n";
    $email_content .= "Message:\n$message\n";
    
    // Build headers
    $headers = "From: $name <$email>";
    
    // Send email
    if (mail($recipient, $subject, $email_content, $headers)) {
        echo json_encode(["success" => true]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "errors" => ["Failed to send message. Please try again later."]]);
    }
} else {
    http_response_code(403);
    echo json_encode(["success" => false, "errors" => ["There was a problem with your submission."]]);
}
?>