// ===== ScrollSpy (resalta el enlace activo según la sección visible) =====
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id], header[id], main[id], div[id]");
  const navLinks = document.querySelectorAll("nav a");

  if (!sections.length || !navLinks.length) return;

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id") || "";
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href") || "";
    if (currentSection && href === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});


// ===== Scroll suave al hacer clic en enlaces del menú =====
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href) return;

    // Solo aplica a anclas internas tipo #seccion
    if (!href.startsWith("#")) return;

    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});


// ===== Modal de contacto =====
function openModal() {
  const modal = document.getElementById("contactModal");
  if (!modal) return;
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("contactModal");
  if (!modal) return;
  modal.style.display = "none";
}

// Cerrar modal si se hace clic fuera de él
window.addEventListener("click", (event) => {
  const modal = document.getElementById("contactModal");
  if (!modal) return;

  // Si el click fue en el fondo (modal-bg), cierra
  if (event.target === modal) {
    closeModal();
  }
});

// Cerrar con tecla ESC (solo si existe el modal)
window.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  const modal = document.getElementById("contactModal");
  if (!modal) return;

  closeModal();
});
