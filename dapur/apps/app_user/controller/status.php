<?php
/**
* @version		2.0
* @package		Fiyo CMS
* @copyright	Copyright (C) 2014 Fiyo CMS.
* @license		GNU/GPL, see LICENSE.
**/

session_start();
if(!isset($_SESSION['USER_LEVEL']) AND $_SESSION['USER_LEVEL'] > 2) die ();
define('_FINDEX_','BACK');

require_once ('../../../system/jscore.php');
$db = new FQuery();  
$db->connect(); 

/****************************************/
/*	    Enable and Disbale User		*/
/****************************************/
if(isset($_GET['stat'])) {
	$id = str_replace(array("\\", "//", "'", "%27", "%"), "", $_GET['id']); 
	if($_GET['stat']=='1'){
		$db->update(FDBPrefix.'user',array("status"=>"1"),'id='.$id);
		alert('success',Status_Applied,1);
	}
	if($_GET['stat']=='0'){
		$db->update(FDBPrefix.'user',array("status"=>"0"),'id='.$id);
		$db->delete(FDBPrefix.'session_login','user_id='.$id);
		alert('success',Status_Applied,1);
	}
	if($_GET['stat']=='kick'){
		$db->delete(FDBPrefix.'session_login','user_id='.$id);
		alert('success',Status_Applied,1);
	}
}
