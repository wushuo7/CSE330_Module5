<?php
    
    session_start();
    header("Content-Type: application/json");
    session_destroy();
    echo json_encode(array("status"=>"success", "why"=>"log out successfully","username"=>"null",));
?>