<?php
	ini_set("session.cookie_httponly", 1);
    require 'database.php';
    session_start();
    header("Content-Type: application/json");
    $token = htmlentities($_POST["token"]);
    if(isset($_SESSION['token']) == false){
        echo json_encode(array("success"=>false,
                               "why"=> "Please login first"
                               ));
        exit();
        
    }
	
    $user = htmlentities($_SESSION['user']);
	$name = htmlentities($_POST["event_name"]);
	$event_share = htmlentities($_POST["event_share"]);
	if($event_share != ""){
	if(mysqli_num_rows(mysqli_query($mysqli, "select username from users where username = '$event_share'" )) ==0){
        echo json_encode(array(
	    "success" => false,
        "why" => "the shared users doesn't exist"
	));
       exit;
    }}
	if($event_share ===$user){
		echo json_encode(array(
	    "success" => false,
        "why" => "you can't share things with yourself"
	));
       exit;
	}
    // check the event exists
	
    if(mysqli_num_rows(mysqli_query($mysqli, "select event_name from events where event_name = '$name'" )) ==1){
        echo json_encode(array(
	    "success" => false,
        "why" => "the event already exists"
	));
       exit;
    }
    $event_owner = $user;
	$event_year = htmlentities($_POST["event_year"]);
	$event_month = htmlentities($_POST["event_month"]);
	$event_day = htmlentities($_POST["event_day"]);
	$event_hour = htmlentities($_POST["event_hour"]);
	$event_minute = htmlentities($_POST["event_minute"]);
	$category = htmlentities($_POST["category"]);
	
    // insert the event
    $stmt = $mysqli->prepare("insert into events (username,
												  event_name,
												  event_year,
												  event_month,
												  event_day,
												  event_hour,
												  event_minute,
												  category,
												  shared_user)
												  values ('$user',
														  '$name',
														  '$event_year',
														  '$event_month',
														  '$event_day',
														  '$event_hour',
														  '$event_minute',
														  '$category',
														  '$event_share')");
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
        "why"=>"creat the event successfully"
	));
    }

    $stmt->execute();
    
    $stmt->close();
    exit();
	
?>