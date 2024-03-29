<?php 
@include('config.php');
  session_start();
  if(isset($_POST['login'])) {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $pass = md5($_POST['pass']);
    echo "<meta http-equiv='refresh' content='0'>";
    $select = "SELECT * FROM user WHERE email='$email' && pass='$pass';";
    $result = mysqli_query($conn, $select);
    if(mysqli_num_rows($result) > 0){
        header('location:ind.html');
    } else{
        $error = 'incorrect email or password!';
        $_SESSION['error']=$error;
        header('location:index.php');
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
    <form action="" method="post">
      <h2>Login</h2>
        <div class="input-field">
        <input type="text" name="email" required>
        <label >Enter your email</label>
      </div>
      <div class="input-field">
        <input type="password" name="pass" required>
        <label>Enter your password</label>
      </div>
     <a href="ind.html"><button type="submit" name="login">Log In</button></a>
      <div class="register">
        <p>Don't have an account? <a href="regi.php">Register</a></p>
      </div>
    </form>
  </div>
</body>
</html>