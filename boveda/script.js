// ====== DATA ======
const PAGES = [
  {
    title: "SQUETZAL DIGITAL | Soluciones Tecnológicas",
    url: "https://squetzaldigital.com/",
    tags: ["servicios", "tecnología", "desarrollo web", "soluciones digitales"],
    description:
      "S QUETZAL DIGITAL: Tu aliado estratégico en desarrollo de software, transformación digital y soluciones tecnológicas a la medida.",
    updatedAt: "2025-09-20"
  },
  {
    title: "KETZALTIK | Body Paint & Maquillaje Artístico",
    url: "https://www.ketsaltik.com/",
    tags: ["body paint", "maquillaje artístico", "arte corporal", "eventos artísticos"],
    description:
      "Ketsaltik: diseños únicos de body paint y maquillaje creativo para eventos, fotografía y talleres, utilizando pinturas hipoalergénicas de alta calidad.",
    updatedAt: "2025-09-18"
  },
  {
    title: "FASE LUNAR | Spa y Bienestar",
    url: "https://www.faselunar.com.mx/",
    tags: ["spa", "bienestar", "tratamientos faciales", "cuidado corporal", "salud y belleza"],
    description:
      "Fase Lunar — spa inspirado en los ciclos de la luna: tratamientos faciales, corporales, capilares, manicure, micropigmentación y cosmética natural para renovar tu energía y bienestar.",
    updatedAt: "2025-09-10"
  }
];

// ====== FUNCIONES ======
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

const state = { q: "", tag: null, sort: "title" };

function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
}

// ====== TAGS ======
function renderTags() {
  const set = new Set(PAGES.flatMap(p => p.tags));
  const container = $("#tags");
  container.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "tag" + (state.tag === null ? " active" : "");
  allBtn.textContent = "Todas";
  allBtn.onclick = () => {
    state.tag = null;
    updateActiveTag();
    renderCards();
  };
  container.appendChild(allBtn);

  [...set].sort((a, b) => a.localeCompare(b, "es")).forEach(t => {
    const el = document.createElement("button");
    el.className = "tag" + (state.tag === t ? " active" : "");
    el.textContent = t;
    el.onclick = () => {
      state.tag = state.tag === t ? null : t;
      updateActiveTag();
      renderCards();
    };
    container.appendChild(el);
  });
}

function updateActiveTag() {
  $$("#tags .tag").forEach(btn => {
    const label = btn.textContent.trim();
    btn.classList.toggle(
      "active",
      (state.tag === null && label === "Todas") || label === state.tag
    );
  });
}

// ====== FILTRO Y RENDER ======
function normalize(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function getFiltered() {
  const qn = normalize(state.q);
  let items = PAGES.filter(
    p =>
      (!state.tag || p.tags.includes(state.tag)) &&
      (normalize(p.title).includes(qn) ||
        normalize(p.url).includes(qn) ||
        normalize(p.description).includes(qn))
  );
  if (state.sort === "title") items.sort((a, b) => a.title.localeCompare(b.title, "es"));
  if (state.sort === "updated") items.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return items;
}

function renderCards() {
  const grid = $("#grid");
  grid.innerHTML = "";
  const items = getFiltered();
  $("#counter").textContent = `${items.length} resultado${items.length === 1 ? "" : "s"}`;

  items.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <div class="meta">
        <span class="badge" title="Última actualización">
          <span class="dot"></span> ${formatDate(p.updatedAt)}
        </span>
        <span class="pill">${new URL(p.url).hostname}</span>
      </div>
      <p class="desc">${p.description}</p>
      <div class="actions">
        <a class="btn" href="${p.url}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 17L17 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 7H17V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          Abrir página
        </a>
        <button class="btn copy" data-url="${p.url}">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9H17C18.1046 9 19 9.89543 19 11V19C19 20.1046 18.1046 21 17 21H9C7.89543 21 7 20.1046 7 19V11C7 9.89543 7.89543 9 9 9Z" stroke="currentColor" stroke-width="1.5"/><path d="M7 15H6C4.89543 15 4 14.1046 4 13V6C4 4.89543 4.89543 4 6 4H13C14.1046 4 15 4.89543 15 6V7" stroke="currentColor" stroke-width="1.5"/></svg>
          Copiar URL
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Copiar URL
  $$(".copy").forEach(btn =>
    btn.addEventListener("click", async e => {
      const url = e.currentTarget.getAttribute("data-url");
      try {
        await navigator.clipboard.writeText(url);
        toast("Enlace copiado");
      } catch {
        toast("No se pudo copiar");
      }
    })
  );
}

function toast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.setAttribute("role", "status");
  t.style.cssText = `
    position:fixed; left:50%; bottom:24px; transform:translateX(-50%);
    background:#0b1326; color:var(--text);
    padding:10px 14px; border:1px solid var(--border);
    border-radius:999px; box-shadow:0 10px 24px rgba(14,165,233,.12);
    z-index:50`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

// ====== EVENTOS UI ======
$("#q").addEventListener("input", e => {
  state.q = e.target.value;
  renderCards();
});
$("#sort").addEventListener("change", e => {
  state.sort = e.target.value;
  renderCards();
});

// ====== TEMA OSCURO FIJO ======
function applyDarkTheme() {
  document.documentElement.dataset.theme = "dark";
  document.documentElement.style.setProperty("--bg", "#0b1220");
  document.documentElement.style.setProperty("--card", "#0f172a");
  document.documentElement.style.setProperty("--text", "#e2e8f0");
  document.documentElement.style.setProperty("--muted", "#94a3b8");
  document.documentElement.style.setProperty("--border", "#1f2937");
  document.documentElement.style.setProperty("--ring", "rgba(34,211,238,.25)");
}
applyDarkTheme();

// ====== INIT ======
(function init() {
  renderTags();
  renderCards();
  $("#year").textContent = new Date().getFullYear();
})();
