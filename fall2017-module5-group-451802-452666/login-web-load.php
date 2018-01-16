<?php
    
    session_start();
    require 'database.php';
    header("Content-Type: application/json");
    if(isset($_SESSION['token']) == false){
        echo json_encode(array("success"=>false,
                               "why"=> "Please login first"
                               ));
        exit();
        
    }
    // check the username
    $user = htmlentities($_SESSION['user']);
    if(mysqli_num_rows(mysqli_query($mysqli, "select username from users where username = '$user'" )) ==0){
        echo json_encode(array("success"=>false,
                               "why"=> "username doesn't exist or wrongpassword"
                               ));
        exit();
    }
    else{
        echo json_encode(array("success"=>true,
                                "username" => $_SESSION['user'],
                                "token"=> $_SESSION['token'],
                                "why"=> "login successfully",
                               ));
        exit();
    }
    
    
    
?>