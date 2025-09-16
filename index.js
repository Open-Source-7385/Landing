// Captura el formulario de contacto
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Gracias por contactarnos, te responderemos pronto 😊");
  this.reset();
});
