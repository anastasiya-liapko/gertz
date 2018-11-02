<?php

$res=[];

$file = $_FILES['file'];
if(isset($file) && $file['name']!=="")
{
    $ignore=0;
    @mkdir($_SERVER['DOCUMENT_ROOT'].'/uploads');
    chmod($_SERVER['DOCUMENT_ROOT'].'/uploads',0777);
    if(!file_exists($_SERVER['DOCUMENT_ROOT'].'/uploads'))
    {
        $res['msg']='Не удается создать папку uploads в корневой директории. Создайте ее самостоятельно и предоставьте системе доступ к ней.';
        $res['status']=1;
        echo json_encode($res);
        die();
    }
    $tm = time();
    $ext = ".".pathinfo($file['name'], PATHINFO_EXTENSION);
    $target_file = $_SERVER['DOCUMENT_ROOT']."/uploads/".$tm."_".md5($file['name']).$ext;
    if(move_uploaded_file($file['tmp_name'], $target_file))
    {
        $file = "/uploads/".$tm."_".md5($file['name']).$ext;
    }
    else
    {
        $res['msg']='Не удается загрузить документ. Попробуйте отправить файл меньшего размера.';
        $res['status']=1;
        echo json_encode($res);
        die();
    }
}
else
{
    $file="";
}

$res['msg']='File is upload';
$res['file_name']=$file;
$res['status']=0;
echo json_encode($res);