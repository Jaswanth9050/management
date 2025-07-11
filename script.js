
document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  // REGISTER PAGE
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('registername').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const user = { name, email, password };
      localStorage.setItem('registeredUser', JSON.stringify(user));
      localStorage.setItem('username', name); // ✅ Store username separately
      alert('Registered successfully!');
      window.location.href = "index.html";
      // window.location.href = "/management/index.html";
    });
  }

  // LOGIN PAGE
  if (loginForm) {
    // Clear previous session storage
    sessionStorage.removeItem('sessionUser');

    // Handle suggestions (only when user clicks input)
    const storedUser = JSON.parse(localStorage.getItem('rememberUser'));
    if (storedUser) {
      // Populate suggestion options using datalist
      const emailList = document.getElementById("emailList");
      const passwordList = document.getElementById("passwordList");

      const emailOption = document.createElement("option");
      emailOption.value = storedUser.email;
      emailList.appendChild(emailOption);

      const passwordOption = document.createElement("option");
      passwordOption.value = storedUser.password;
      passwordList.appendChild(passwordOption);
    }

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const remember = document.getElementById('rememberMe').checked;

      const user = JSON.parse(localStorage.getItem('registeredUser'));

      if (user && email === user.email && password === user.password) {
        alert('Login successful!');
        localStorage.setItem("isLoggedIn", "true");
        // localStorage.setItem("username",user.email)
        localStorage.setItem("username", user.name); // ✅ Get name from registeredUser object


        if (remember) {
          localStorage.setItem('rememberUser', JSON.stringify({ email, password }));
        } else {
          sessionStorage.setItem('sessionUser', email);
          localStorage.removeItem('rememberUser'); // Remove old remember data
        }
        window.location.href = "dashboard.html";
      } else {
        alert('Invalid credentials');
      }
    });
  }
});



