
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
