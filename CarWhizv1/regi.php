<?php
@include('config.php');
if(isset($_POST['regi'])) {
    
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $pass = md5($_POST['pass']);
    echo "<meta http-equiv='refresh' content='0'>";
    $select = "SELECT * FROM user WHERE email ='$email' && pass='$pass';";
    $result = mysqli_query($conn, $select);
    if(mysqli_num_rows($result)>0) {
      echo "<script type='text/javascript'>toastr.warning('User exists');</script>";
      $_SESSION['error']=$error;
      $error=('user exists');
    } else {
        $insert = "INSERT INTO user(email,pass) VALUES('$email','$pass');";
        $a = mysqli_query($conn, $insert);
        if($a) {
          echo "<script type='text/javascript'>toastr.success('User Created');</script>";
          header('location:index.php');
        } else {
          echo "<script type='text/javascript'>toastr.error('Error');</script>";
          $error='Error';
        }
        header('regi.php');
      } 
    };
?>
<!DOCTYPE html>
<!-- Coding By CodingNepal - www.codingnepalweb.com -->
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CarWhiz</title>
  <link rel="stylesheet" href="style.css">
  <link rel="shortcut icon" href="images/c-removebg-preview.png" type="image/x-icon">
</head>
<body>
  <div class="wrapper">
    <form method="post">
      <h2>Register</h2>
        <div class="input-field">
        <input type="text" name="email" required>
        <label>Enter your email</label>
      </div>
      <div class="input-field">
        <input type="password" name="pass" required>
        <label>Enter your password</label>
      </div>
     <a href="log.php"><button type="submit" name="regi">Register</button></a>
      <!-- <div class="register">
        <p>Don't have an account? <a href="#">Register</a></p>
      </div> -->
    </form>
  </div>
</body>
</html>