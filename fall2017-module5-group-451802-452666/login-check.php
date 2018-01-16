<?php
    ini_set("session.cookie_httponly", 1);
    session_start();
    require 'database.php';
    header("Content-Type: application/json");
    
    $user = htmlentities($_POST['username']);
    $pwd = htmlentities($_POST['password']);
    // check the username
    if(mysqli_num_rows(mysqli_query($mysqli, "select username from users where username = '$user'" )) ==0){
        echo json_encode(array("success"=>false,
                               "why"=> "username doesn't exist1"
                               ));
        exit();
    }
    // get the password
    $stmt = $mysqli->prepare("select hashed_password from users where username = '$user'");
    
        if(!$stmt){
           echo json_encode(array("success"=>false,
                               "why"=> "can't connect the database"
                               ));
        exit();
        }
        
        $stmt->execute();
        // Bind the results
        $stmt->bind_result($pwd_hash);
        $stmt->fetch();
        $stmt->close();
        
        if(password_verify($pwd, $pwd_hash)){
            $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
            $_SESSION['user'] = $user;
            echo json_encode(array(
            "success" => true,
            "username" => $_SESSION['user'],
            "token"=> $_SESSION['token'],
            "why"=> "login successfully"
            ));
            exit();
        
        }
        else{
            echo json_encode(array("success"=>false,
                               "why"=> "the password doesn't correct"
                               ));
            exit();
        }
    
    
    
?>