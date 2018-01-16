<?php
    require 'database.php';
    session_start();
    header("Content-Type: application/json");
    
    $user = htmlentities($_POST['username']);
    $password1 = htmlentities($_POST['password']);
    $options = [
    'cost' => 12 // the default cost is 10
    ];
    // $password_en=crypt($password,$salt);
    $password_new = password_hash($password1,PASSWORD_DEFAULT,$options);
    
    // check the username exists
    if(mysqli_num_rows(mysqli_query($mysqli, "select username from users where username = '$user'" )) ==1){
        echo json_encode(array(
	    "success" => false,
        "why" => "the Username already exists"
	));
       exit;
    }
    
    // insert the username
    $stmt = $mysqli->prepare("insert into users (username, hashed_password) values ('$user','$password_new')");
    if(!$stmt){
        echo json_encode(array(
	    "success" => false,
	    "why" => "Sorry, please try again"
	));
    }
    else{
        echo json_encode(array(
	    "success" => true,
	    "username" => $_SESSION['user'],
        "why"=>"register successfully and login now"
	));
    }

    $stmt->execute();
    
    $stmt->close();
    exit();
?>