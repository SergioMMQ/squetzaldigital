// ===== ScrollSpy (resalta el enlace activo según la sección visible) =====
document.addEventListener("scroll", () => {
  // ✅ Incluimos también <main> y <header> además de <section> y <div[id]>
  const sections = document.querySelectorAll("section[id], header[id], main[id], div[id]");
  const navLinks = document.querySelectorAll("nav a");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120; // margen de compensación por el nav fijo
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  // Activa solo el enlace de la sección visible
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});


// ===== Scroll suave al hacer clic en enlaces del menú =====
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // ajusta según el tamaño del nav
        behavior: "smooth"
      });
    }
  });
});


// ===== Formulario de empleados =====
document.getElementById('formEmpleado').addEventListener('submit', function(event) {
  event.preventDefault();
  const numero = document.getElementById('numeroTrabajador').value.trim();
  
  if (numero) {
    window.location.href = `empleados/${numero}.html`;
  } else {
    alert('Por favor ingresa un número de trabajador válido.');
  }
});


// ===== Modal de contacto =====
function openModal() {
  document.getElementById('contactModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('contactModal').style.display = 'none';
}

// Cerrar modal si se hace clic fuera de él
window.onclick = function(event) {
  const modal = document.getElementById('contactModal');
  if (event.target === modal) {
    closeModal();
  }
};

// Cerrar con tecla ESC
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
