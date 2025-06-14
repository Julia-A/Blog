const eyeIcon = document.getElementById('eye-icon');
  const passwordField = document.getElementById('password');

  eyeIcon.addEventListener('click', function () {
    // Toggle the type of the input field
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      eyeIcon.textContent = '🙈'; // Change icon to indicate it's showing
    } else {
      passwordField.type = 'password';
      eyeIcon.textContent = '👁️'; // Revert to the original eye icon
    }
  });


  function validateForm() {
    const username = document.getElementsByName('username')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;

    // Username: Check if it's not empty
    if (username === "") {
      alert("Username must be filled out");
      return false;
    }

    // Email: Check if it's a valid email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    // Password: Check if it has at least 6 characters
    if (password.length < 8) {
      alert("Password must be at least 6 characters long");
      return false;
    }

    // If everything is valid
    return true;
  }