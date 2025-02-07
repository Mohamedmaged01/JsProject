const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");
const forgotPasswordLink = document.getElementById("forgotPassword");

const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

document.getElementById("UserInp").addEventListener("input", () => {
  document.getElementById("nameError").textContent = "";
});
document.getElementById("EmailInpSignUp").addEventListener("input", () => {
  document.getElementById("emailErrorSignUp").textContent = "";
});
document.getElementById("PassInpSignUp").addEventListener("input", () => {
  document.getElementById("passwordErrorSignUp").textContent = "";
});
document.getElementById("EmailInpLogin").addEventListener("input", () => {
  document.getElementById("emailErrorLogin").textContent = "";
});
document.getElementById("PassInpLogin").addEventListener("input", () => {
  document.getElementById("passwordErrorLogin").textContent = "";
});

signUpForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = document.getElementById("UserInp").value.trim();
  const email = document.getElementById("EmailInpSignUp").value;
  const password = document.getElementById("PassInpSignUp").value;

  if (!name) {
    document.getElementById("nameError").textContent = "Name cannot be empty.";
    return;
  } else if (!nameRegex.test(name)) {
    document.getElementById("nameError").textContent = "Invalid name format.";
    return;
  }

  if (!passwordRegex.test(password)) {
    document.getElementById("passwordErrorSignUp").textContent =
      "Password must be at least 6 characters long and include one uppercase letter, one number, and one special character.";
    return;
  }

  if (!emailRegex.test(email)) {
    document.getElementById("emailErrorSignUp").textContent =
      "Invalid email format.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email]) {
    document.getElementById("emailErrorSignUp").textContent =
      "Email already in use.";
    return;
  }

  users[email] = { name, password };
  localStorage.setItem("users", JSON.stringify(users));

  const token = btoa(JSON.stringify({ email, name }));
  localStorage.setItem("token", token);

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({ username: name, email })
  );

  alert("Account created successfully!");


  window.location.href = "Home.html";
});


loginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const email = document.getElementById("EmailInpLogin").value;
  const password = document.getElementById("PassInpLogin").value;

  const adminEmail = "maged@gmail.com";
  const adminPassword = "MagedMaged0@";

  if (email === adminEmail && password === adminPassword) {
    window.location.href = "Admin.html";
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (!users[email]) {
    document.getElementById("emailErrorLogin").textContent = "User not found.";
    return;
  }

  // Check if the password is correct.
  if (users[email].password !== password) {
    document.getElementById("passwordErrorLogin").textContent =
      "Incorrect password.";
    return;
  }

  // Create and store an encoded token.
  const token = btoa(JSON.stringify({ email, name: users[email].name }));
  localStorage.setItem("token", token);

  // Store the logged in user details.
  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({ username: users[email].name, email })
  );

  alert("Login successful!");

  // Redirect to home page.
  window.location.href = "Home.html";
});

// Forgot Password Handler
forgotPasswordLink.addEventListener("click", (evt) => {
  evt.preventDefault();
  const email = prompt("Please enter your email address:");
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[email]) {
    alert("User not found.");
    return;
  }

  const newPassword = prompt("Enter a new password:");
  if (newPassword) {
    // (Optional: Add password validation for the new password here.)
    users[email].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password reset successful!");
  }
});

// Optional: Toggle between sign-up and login views.
document.getElementById("signUp").addEventListener("click", () => {
  document.getElementById("main").classList.add("right-panel-active");
});
document.getElementById("signIn").addEventListener("click", () => {
  document.getElementById("main").classList.remove("right-panel-active");
});
