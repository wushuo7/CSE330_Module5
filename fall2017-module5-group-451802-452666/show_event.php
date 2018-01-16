<?php
    require 'database.php';
	ini_set("session.cookie_httponly", 1);
    session_start();
    header("Content-Type: application/json");
    
	$user = htmlentities($_SESSION['user']);
    if(mysqli_num_rows(mysqli_query($mysqli, "select username from users where username = '$user'" )) ==0){
        echo json_encode(array("success"=>false,
                               "why"=> "username doesn't exist or please login first"
                               ));
        exit();
    }
    
    $stmt = $mysqli->prepare("select event_name, event_year, event_month, event_day,event_hour, event_minute,category from events where username =? or shared_user = ? order by event_hour asc, event_minute asc");
    if(!$stmt){
		echo json_encode(array("success"=>false,
                               "why"=> $mysqli->error
                               ));
        exit();

    }
    
   
    $stmt->bind_param('ss', $user,$user);

    $stmt->execute();

    $stmt->bind_result($event_name,$event_year, $event_month, $event_day,$event_hour,$event_minute,$event_category);
    // print out the information
	$Name_event = array();
	$Day_event =array();
	$s =0;
    while($stmt->fetch()){
		$Name_event[$s]=htmlentities($event_name);
		$Year_event[$s]=$event_year;
		$Month_event[$s]=$event_month;
		$Day_event[$s]=$event_day;
		$Hour_event[$s]=htmlentities($event_hour);
		$Minute_event[$s]=htmlentities($event_minute);
		$Category_event[$s]=htmlentities($event_category);
		$s++;
	}
    echo json_encode(array("success"=>true,
                               "why"=> "Show the events",
							   "Name_event"=>$Name_event,
							   "Year_event"=>$Year_event,
							   "Month_event"=>$Month_event,
							   "Day_event"=>$Day_event,
							   "Hour_event"=>$Hour_event,
							   "Minute_event"=>$Minute_event,
							   "Category_event"=>$Category_event
                               ));
    $stmt->close();
    exit();
	
?>