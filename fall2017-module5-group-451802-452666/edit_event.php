<?php
    require 'database.php';
	ini_set("session.cookie_httponly", 1);
    session_start();
    header("Content-Type: application/json");
    $token = htmlentities($_POST["token"]);
    if(isset($_SESSION['token']) == false){
        echo json_encode(array("success"=>false,
                               "why"=> "Request forgery detected"
                               ));
        exit();
        
    }
	
    $user = htmlentities($_SESSION['user']);
	$name = htmlentities($_POST["new_name"]);
	$event_share = htmlentities($_POST["new_share"]);
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
	
    if(mysqli_num_rows(mysqli_query($mysqli, "select event_name from events where event_name = '$name'" )) ==0){
        echo json_encode(array(
	    "success" => false,
        "why" => "the event doesn't exist"
	));
       exit;
    }
	$stmt1= $mysqli->prepare("select username from events where event_name=?");
	if(!$stmt1){
         echo json_encode(array("status"=>"failure","error" => $mysqli->error));
         exit;
      }
      $stmt1->bind_param('s', $name);
      $stmt1->execute();
      $stmt1->bind_result($user_name);
      $stmt1->fetch();
      $stmt1->close();
	  if($user_name !=$user){
		echo json_encode(array(
	    "success" => false,
        "why" => "you can't change other's event"
				));
		exit;
		}
    $new_event_owner = $user;
	$new_event_year = htmlentities($_POST["new_year"]);
	$new_event_month = htmlentities($_POST["new_month"]);
	$new_event_day = htmlentities($_POST["new_day"]);
	$new_event_hour = htmlentities($_POST["new_hour"]);
	$new_event_minute = htmlentities($_POST["new_minute"]);
	$new_category = htmlentities($_POST["new_category"]);
	
    // insert the event
	$stmt2 = $mysqli->prepare("update events set
							  event_year = '$new_event_year',
							  event_month = '$new_event_month',
							  event_day = '$new_event_day',
							  event_hour = '$new_event_hour',
							  event_minute = '$new_event_minute',
							  category = '$new_category',
							  shared_user = '$event_share'
							  WHERE event_name = '$name' ");
        if(!$stmt2){
				echo json_encode(array(
				"success" => false,
				"why" => $mysqli->error
			));
		}
    else{
        echo json_encode(array(
	    "success" => true,
	    "username" => $_SESSION['user'],
        "why"=>"edit the event successfully"
	));
    }

    $stmt2->execute();
    
    $stmt2->close();
    exit();
	
?>