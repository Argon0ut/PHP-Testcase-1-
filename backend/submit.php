<?php
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");


$servername = "localhost";
$username = "root";  
$password = "";  
$database = "test_form"; 

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['name']) && !empty($data['phone'])) {
    $name = $conn->real_escape_string($data['name']);
    $phone = $conn->real_escape_string($data['phone']);

    $sql = "INSERT INTO users (name, phone) VALUES ('$name', '$phone')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Registration successful"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Invalid input"]);
}

$conn->close();
?>
