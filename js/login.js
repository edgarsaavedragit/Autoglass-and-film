// Inicializa contraseña si no existe
if (!localStorage.getItem("adminPassword")) {
  localStorage.setItem("adminPassword", "1234");
}

// Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const storedPass = localStorage.getItem("adminPassword");

  if (user === "admin" && pass === storedPass) {
    window.location.href = "admin-dashboard.html";
  } else {
    document.getElementById("loginError").textContent = "Usuario o contraseña incorrectos";
  }
});

// Mostrar formulario de cambio de contraseña
document.getElementById("showChangePassword").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("changePasswordForm").classList.toggle("hidden");
});

// Cambiar contraseña
document.getElementById("changePasswordForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const current = document.getElementById("currentPassword").value;
  const nuevo = document.getElementById("newPassword").value;
  const storedPass = localStorage.getItem("adminPassword");
  const msg = document.getElementById("changePasswordMsg");

  if (current === storedPass) {
  localStorage.setItem("adminPassword", nuevo);
  alert("✅ Contraseña actualizada correctamente.");
  this.reset();
  this.classList.add("hidden");
  } else {
    msg.style.color = "red";
    msg.textContent = "❌ Contraseña actual incorrecta.";
  }
});
