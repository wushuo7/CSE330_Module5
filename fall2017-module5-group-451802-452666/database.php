<?php
// Content of database.php

$mysqli = new mysqli('localhost', 'M3', '1234', 'm5');

if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>