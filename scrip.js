document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section, div[id]");
    const navLinks = document.querySelectorAll("nav a");

    let currentSection = "";

    // Encuentra la sección en la que está el usuario
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 50; // Ajusta según el padding/margen del header
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    // Activa el hover y mantiene la clase 'active' hasta la siguiente sección
    navLinks.forEach((link) => {
        link.classList.remove("active");  // Elimina la clase 'active' de todos los enlaces

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");  // Añade 'active' solo al enlace correspondiente
        }
    });
});

    document.getElementById('formEmpleado').addEventListener('submit', function(event) {
        event.preventDefault();
        const numero = document.getElementById('numeroTrabajador').value.trim();
        
        if(numero) {
            // Redirige a la URL del perfil del empleado
            window.location.href = `empleados/${numero}.html`;
        } else {
            alert('Por favor ingresa un número de trabajador válido.');
        }
    });

  function openModal() {
    document.getElementById('contactModal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
  }

  // Opcional: cerrar si se hace clic fuera del modal
  window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
      closeModal();
    }
  }
