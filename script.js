// ===== Nav scroll effect =====
(function () {
  const nav = document.getElementById("main-nav");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

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


// ===== Carrusel auto-scroll (solo activo cuando hay scroll horizontal) =====
function initCarrusel(gridSel, cardSel, dotSel) {
  const grid = document.querySelector(gridSel);
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(cardSel));
  const dots  = dotSel ? Array.from(document.querySelectorAll(dotSel)) : [];
  let current = 0;
  let timer;

  function isScrollable() {
    return grid.scrollWidth > grid.offsetWidth + 4;
  }

  function goTo(idx) {
    if (!isScrollable()) return;
    current = (idx + cards.length) % cards.length;
    const card = cards[current];
    const left = card.offsetLeft - (grid.offsetWidth - card.offsetWidth) / 2;
    grid.scrollTo({ left, behavior: "smooth" });
    dots.forEach((d, i) => d.classList.toggle("promo-dot--active", i === current));
  }

  function startAuto() { timer = setInterval(() => goTo(current + 1), 3000); }
  function stopAuto()  { clearInterval(timer); }

  // Pausa al tocar, reanuda 4 s después
  grid.addEventListener("pointerdown", () => {
    stopAuto();
    clearTimeout(grid._resumeTimer);
    grid._resumeTimer = setTimeout(startAuto, 4000);
  });

  // Actualiza índice al hacer scroll manual
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && e.intersectionRatio >= 0.5) {
        current = cards.indexOf(e.target);
        dots.forEach((d, i) => d.classList.toggle("promo-dot--active", i === current));
      }
    });
  }, { root: grid, threshold: 0.5 });

  cards.forEach((c) => observer.observe(c));
  startAuto();
}

document.addEventListener("DOMContentLoaded", () => {
  initCarrusel(".promociones-grid",     ".promo-card",      ".promo-dot");
  initCarrusel(".recomendaciones-grid", ".testimonio-card", null);

  // Anti-bot: bloquea envíos realizados en menos de 3 segundos
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      const tsField = document.getElementById("_form_loaded");
      if (!tsField || !tsField.value) return;
      const elapsed = Date.now() - parseInt(tsField.value, 10);
      if (elapsed < 3000) e.preventDefault();
    });
  }
});

// ===== Modal de contacto =====
function openModal() {
  const modal = document.getElementById("contactModal");
  if (!modal) return;
  modal.style.display = "flex";

  const tsField = document.getElementById("_form_loaded");
  if (tsField) tsField.value = Date.now();
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
