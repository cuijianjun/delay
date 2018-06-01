<?php
    
    // 连接数据库
    
    $connect = mysqli_connect('127.0.0.1', 'root', '123456', 'study');

    $sql = 'SELECT * FROM goods LIMIT 0, 50';

    $res = mysqli_query($connect, $sql);

    $rows = array();

    while($row = mysqli_fetch_assoc($res)) {
        $rows[] = $row;
    }

    // print_r($rows);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        .wrapper {
            width: 1000px;
            margin: 50px auto;
        }
        
        img {
            width: 100%;
        }
        
        p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="items">
            <?php foreach($rows as $key=>$val) { ?>
            <div class="item">
                <img width="<?php echo $val['width']; ?>" height="<?php echo $val['height']; ?>" src="<?php echo $val['path']; ?>" alt="">
                <p><?php echo $val['text']; ?></p>
            </div>
            <?php } ?>
        </div>
        <div class="footer">
            <p>版权所有</p>
        </div>
    </div>
    <script src="./libs/jquery-1.12.4.js"></script>
    <script src="./jquery.waterfall.js"></script>
    <script>
        // 通过 定位（绝对定位）来实现
        // 借助于 javascript 来计算每个元素的定位坐标

        // 瀑布流每列的宽度是固定的，高度是变化的

        $('.items').waterfall();
    </script>
</body>
</html>