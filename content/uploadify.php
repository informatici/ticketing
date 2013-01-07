<?php
/*
Uploadify v2.1.0
Release Date: August 24, 2009

Copyright (c) 2009 Ronnie Garcia, Travis Nickels

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
if (!empty($_FILES)) {
	$tempFile = $_FILES['Filedata']['tmp_name'];
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $_REQUEST['folder'] . '/';
	$targetFile =  str_replace('//','/',$targetPath) . $_FILES['Filedata']['name'];
	$thumb_target_file = str_replace('//','/',$targetPath) . '/thumb_' . $_FILES['Filedata']['name'];
	
	$img_thumb_width = 214;
	$img_thumb_height = 80;

	$new_image_ratio = $img_thumb_width/$img_thumb_height;

	$old_image_info = array();
	$old_image_info = getimagesize($tempFile);

	if($old_image_info['mime'] == "image/pjpeg" || $old_image_info['mime'] == "image/jpeg"){
		$new_image = imagecreatefromjpeg($tempFile);
	} else if($old_image_info['mime'] == "image/x-png" || $old_image_info['mime'] == "image/png"){
		$new_image = imagecreatefrompng($tempFile);
	} else if($old_image_info['mime'] == "image/gif"){
		$new_image = imagecreatefromgif($tempFile);
	}
		
	$imgratio=$old_image_info[0]/$old_image_info[1];

	if ($imgratio > $new_image_ratio){
		$newwidth = $img_thumb_width;
		$newheight = $img_thumb_width/$imgratio;
	} else {
		$newheight = $img_thumb_height;
		$newwidth = $img_thumb_height*$imgratio;
	}

	$resized_img = imagecreatetruecolor($newwidth,$newheight);

	imagecopyresized($resized_img, $new_image, 0, 0, 0, 0, $newwidth, $newheight, $old_image_info[0], $old_image_info[1]);

	imagejpeg($resized_img,$thumb_target_file);
	imagedestroy($resized_img);
	imagedestroy($new_image);	

	move_uploaded_file($tempFile,$targetFile);
	echo "1";

}
?>