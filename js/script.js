//Menu desplegable
  function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('open');
  }

// Cerrar el menú al hacer clic fuera de él
document.addEventListener('click', function (event) {
  const menu = document.getElementById('nav-menu');
  const hamburger = document.querySelector('.hamburger');

  const isClickInsideMenu = menu.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);

  if (menu.classList.contains('active') && !isClickInsideMenu && !isClickOnHamburger) {
    menu.classList.remove('active');
    hamburger.classList.remove('open');
  }
});

// Cerrar el menú al hacer clic en una opción
document.querySelectorAll('#nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.remove('active');
    hamburger.classList.remove('open');
  });
});

//Cotizacion
document.getElementById("formCotizacion").addEventListener("submit", function (e) {
  e.preventDefault();

  const cotizacion = {
    nombre: this[0].value.trim(),
    correo: this[1].value.trim(),
    distrito: this[2].value.trim(),
    servicio: this[3].value.trim(),
    comentario: this[4].value.trim(),
    fechaHora: new Date().toLocaleString()
  };

  let cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];

  // Filtrar solo registros válidos (que sí tienen fechaHora)
  cotizaciones = cotizaciones.filter(c => c.fechaHora);

  // Agregar la nueva cotización
  cotizaciones.push(cotizacion);

  // Guardar en localStorage
  localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));

  alert("✅ Tu solicitud ha sido enviada con éxito. Pronto nos pondremos en contacto.");
  this.reset();
});

// Carga servicios desde servicios.json
async function cargarServicios() {
  const res = await fetch("servicios.json");
  const servicios = await res.json();
  const contenedor = document.getElementById("servicios");
  contenedor.innerHTML = "";

  servicios.forEach(servicio => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.innerHTML = `
      <h2>${servicio.titulo}</h2>
      <p>${servicio.descripcion}</p>
      <span>${servicio.detalle}</span>
    `;
    card.onclick = () => mostrarProductos(servicio.titulo);
    contenedor.appendChild(card);
  });
}

async function mostrarProductos(servicio) {
  const res = await fetch("productos.json");
  const productos = await res.json();

  document.getElementById("servicios").style.display = "none";
  document.getElementById("detalleServicio").style.display = "block";
  document.getElementById("tituloDetalle").innerText = servicio;

  const lista = document.getElementById("listaProductos");
  lista.innerHTML = "";

  if (!productos[servicio]) {
    lista.innerHTML = "<p>No hay productos para mostrar.</p>";
    return;
  }

  productos[servicio].forEach(p => {
    const div = document.createElement("div");
    div.className = "producto-card";
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="producto-img">
      <h4>${p.nombre}</h4>
      <p>${p.precio}</p>
    `;
    lista.appendChild(div);
  });
}

function volver() {
  document.getElementById("servicios").style.display = "grid";
  document.getElementById("detalleServicio").style.display = "none";
}

document.addEventListener("DOMContentLoaded", cargarServicios);
