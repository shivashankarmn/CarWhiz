

<script>
  const submit = document.getElementById("submit");
  submit.addEventListener("click", () => {
    createToast("success", "Feedback submitted");
  });
</script>


<?php
header("location: feedback.php");
?>