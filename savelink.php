<?php
    $link1 = $_POST['link1'];
    $link2 = $_POST['link2'];
    $link3 = $_POST['link3'];
    $link4 = $_POST['link4'];
    
    
    $filename = "txt/links.txt";
    chmod($filename,0777);
    $f = fopen($filename, "w+") or die("fopen failed");
    $data = $link1.';'.$link2.';'.$link3.';'.$link4;
    fwrite($f, $data);
    fclose($f);
?>
