document.addEventListener("DOMContentLoaded", function () {
  cargarCotizaciones();
});

function cargarCotizaciones() {
  const cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
  const contenedor = document.getElementById("cotizaciones-container");
 
  contenedor.innerHTML = "";

  if (cotizaciones.length === 0) {
    contenedor.innerHTML = "<p>No hay cotizaciones registradas.</p>";
    return;
  }

  cotizaciones.forEach((c, index) => {
    const div = document.createElement("div");
    div.className = "cotizacion-card";

    const fechaHora = c.fechaHora ? c.fechaHora : "No registrada";

    div.innerHTML = `
      <h3><strong>Cliente:</strong> ${c.nombre}</h3>
      <p><strong>Correo:</strong> ${c.correo}</p>
      <p><strong>Distrito:</strong> ${c.distrito}</p>
      <p><strong>Servicio:</strong> ${c.servicio}</p>
      <p><strong>Comentario:</strong> ${c.comentario}</p>
      <p><strong>Fecha/Hora:</strong> ${fechaHora}</p>
      <button onclick="eliminarCotizacion(${index})">Eliminar Cotización</button>
    `;
    contenedor.appendChild(div);
  });
}

function eliminarCotizacion(index) {
  const cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
  cotizaciones.splice(index, 1);
  localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));
  cargarCotizaciones();
}

function descargarComoTXT() {
  const cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
  if (cotizaciones.length === 0) return alert("No hay cotizaciones.");

  const contenido = cotizaciones.map(c => {
    const fechaHora = c.fechaHora ? c.fechaHora : "No registrada";
    return `Nombre: ${c.nombre}
Correo: ${c.correo}
Distrito: ${c.distrito}
Servicio: ${c.servicio}
Comentario: ${c.comentario}
Fecha/Hora: ${fechaHora}

`;
  }).join('');

  const blob = new Blob([contenido], { type: 'text/plain' });
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(blob);
  enlace.download = 'reporte-cotizaciones.txt';
  enlace.click();
}

function descargarComoJSON() {
  const cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
  if (cotizaciones.length === 0) return alert("No hay cotizaciones.");

  const blob = new Blob([JSON.stringify(cotizaciones, null, 2)], { type: 'application/json' });
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(blob);
  enlace.download = 'reporte-cotizaciones.json';
  enlace.click();
}

function cerrarSesion() {
  alert("✅ Sesión cerrada");
  window.location.href = "admin-login.html";
}
