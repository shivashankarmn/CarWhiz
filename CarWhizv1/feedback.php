<?php 
@include('config.php');
  session_start();
  if(isset($_POST['submit'])) {
    $uname = mysqli_real_escape_string($conn, $_POST['uname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $msg = mysqli_real_escape_string($conn, $_POST['msg']); 
    // echo "<meta http-equiv='refresh' content='0'>";
    $insert= "INSERT INTO feed(uname, email, msg) VALUES('$uname', '$email', '$msg');";
    $result = mysqli_query($conn, $insert);
  };
  
?>



<!DOCTYPE html>
<html>

<head>
  <!-- Basic -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!-- Mobile Metas -->
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <!-- Site Metas -->
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="author" content="" />
  <link rel="shortcut icon" href="images/c-removebg-preview.png" type="image/x-icon">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
  <link rel="stylesheet" href="css/toast_style.css" type="text/css">

  <title>CarWhiz</title>  

  <!-- bootstrap core css -->
  <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />

  <!-- fonts style -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Poppins:400,600,700&display=swap" rel="stylesheet" />

  <!-- Custom styles for this template -->
  <link href="css/style.css" rel="stylesheet" />
  <!-- responsive style -->
  <link href="css/responsive.css" rel="stylesheet" />
</head>

<body class="sub_page">
  <ul class="notifications"></ul>
  <div class="hero_area">
    <!-- header section strats -->
    <div class="hero_bg_box">
      <div class="img-box">
        <img src="images/hero-bg.jpg" alt="">
      </div>
    </div>

    <header class="header_section">
  
      <div class="header_bottom">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg custom_nav-container">
            <a class="navbar-brand" href="ind.html">
              <span>
                CarWhiz
              </span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class=""></span>
            </button>
            
            <div class="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
              <ul class="navbar-nav  ">
                <li class="nav-item ">
                  <a class="nav-link" href="ind.html">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="about.html"> About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="bot.html"> CarAI </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="feedback.php"> Feedback </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="logout.php">Logout</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
    <!-- end header section -->
  </div>

  <!-- team section -->

  
  <section class="contact_section layout_padding">
    <div class="contact_bg_box">
      <div class="img-box">
        <img src="images/peter-broomfield-m3m-lnR90uM-unsplash.jpg" height="800" alt="">
      </div>
    </div>
    <div class="container">
      <div class="heading_container heading_center">
        <h2>
          Get In touch
        </h2>
      </div>
      <div class="form-box">
        <div class="row">
            <div class="col-md-7 mx-auto">
                <div class="contact_form-container">
                    <div>
                        <form action="" method="post">
                            <div>
                                <input type="text" name="uname" placeholder="Full Name" class="message_1"/>
                            </div>
                            <div>
                                <input type="email" name="email" placeholder="Email" class="message_1"/>
                            </div>
                            <!-- <div>
                                <input type="text" name="phone" placeholder="Phone Number" />
                            </div> -->
                            <div>
                                <input type="text" placeholder="Message" name="msg" class="message_input" />
                            </div>
                            <div class="btn-box">
                                <button type="submit" name="submit" id="submit">SEND</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </div>
  </section>
  <!-- end team section -->



  <!-- footer section -->
  <footer class="container-fluid footer_section">
    <p>
      &copy; <span id="currentYear"></span> All Rights Reserved. Design by
      <a href="ind.html">CarWhiz</a>
    </p>
  </footer>
  <!-- footer section -->
  <script src="js/toast_script.js" type="module"></script>
  <script src="js/jquery-3.4.1.min.js"></script>
  <script src="js/bootstrap.js"></script>
  <script src="js/custom.js"></script>
  <script>
  const submit = document.getElementById("submit");
  submit.addEventListener("click", () => {
    createToast("success", "Feedback submitted");
  });
</script>
</body>

</html>