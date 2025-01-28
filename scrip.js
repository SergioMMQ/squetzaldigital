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
    let activeFound = false;

    navLinks.forEach((link) => {
        link.classList.remove("active");  // Elimina la clase 'active' de todos los enlaces

        if (!activeFound && link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");  // Añade 'active' solo al enlace correspondiente
            activeFound = true;  // Asegura que solo el primer enlace de la sección visible tenga 'active'
        }
    });
});
