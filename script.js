    const btn = document.getElementById('btnUbicacion');
    const mensaje = document.getElementById('mensaje');

    function mostrarUbicacion(lat, lon, fuente) {
        mensaje.textContent = `Ubicación: Latitud ${lat}, Longitud ${lon} (Obtenida de ${fuente})`;
        }

btn.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
                // Guardar en localStorage
            localStorage.setItem('ultima_ubicacion', JSON.stringify({lat, lon}));
            mostrarUbicacion(lat, lon, "GPS");
        }, function(error) {
                // Si hay error con GPS, verificar LocalStorage
                const ultima = localStorage.getItem('ultima_ubicacion');
                if (ultima) {
                    const {lat, lon} = JSON.parse(ultima);
                    mostrarUbicacion(lat, lon, "LocalStorage");
                } else {
                        mensaje.textContent = 'No se pudo obtener la ubicación ni hay una guardada previamente.';
                }
            });
    } else {
            // Si no hay geolocalización, verificar LocalStorage
        const ultima = localStorage.getItem('ultima_ubicacion');
        if (ultima) {
            const {lat, lon} = JSON.parse(ultima);
            mostrarUbicacion(lat, lon, "LocalStorage");
        } else {
                mensaje.textContent = 'El navegador no soporta geolocalización y no hay ubicación guardada.';
        }
    }
});



const modoToggle = document.getElementById('modoToggle');
const modoLabel = document.getElementById('modoToggleLabel');
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('modo_tema', theme);
  modoToggle.checked = (theme === 'dark');
  modoLabel.textContent = theme === 'dark' ? '🌙' : '🌞';
}
// Elegir desde localStorage o por defecto claro
const savedTheme = localStorage.getItem('modo_tema');
setTheme(savedTheme === 'dark' ? 'dark' : 'light');
modoToggle.addEventListener('change', () => {
  setTheme(modoToggle.checked ? 'dark' : 'light');
});