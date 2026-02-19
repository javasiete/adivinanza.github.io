// ====== PRECARGA DE SONIDO ======
const sonidoClick = new Audio("sonidos/click.wav");
sonidoClick.preload = "auto";

// ====== ARRAY DE CLUBES ======
const clubes_argentinos = [
  "imgs/argentinos.png",
  "imgs/atleticoTucuman.png",
  "imgs/banfield.png",
  "imgs/boca.png",
  "imgs/estudiantes.png",
  "imgs/gimnasia.png",
  "imgs/huracan.png",
  "imgs/independiente.png",
  "imgs/lanus.png",
  "imgs/newells.png",
  "imgs/racing.png",
  "imgs/river.png",
  "imgs/rosario.png",
  "imgs/sanLorenzo.png",
  "imgs/velez.png"
];

// ====== LETRAS A-Z ======
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ====== REFERENCIAS DOM ======
const boton = document.getElementById("btn-comenzar");
const cajaIzquierda = document.getElementById("caja-izquierda");
const cajaDerecha = document.getElementById("caja-derecha");
const equis = document.querySelector(".equis");

// ====== VARIABLES DE CONTROL ======
let contadorActivo = false;
let imagenesPrecargadas = false;

// ====== FUNCIÓN DE PRECARGA REAL (ESPERA CARGA COMPLETA) ======
function precargarImagenes(rutas) {
  return Promise.all(
    rutas.map((ruta) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = ruta;

        // Cuando la imagen termina de cargar (o falla), resolvemos
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn("No se pudo cargar:", ruta);
          resolve(); // Evita que el juego se bloquee si falta una imagen
        };
      });
    })
  );
}

// ====== BLOQUEAR BOTÓN HASTA QUE TODO CARGUE ======
boton.disabled = true;
boton.textContent = "Cargando...";

// Precargar imágenes al iniciar la página
precargarImagenes(clubes_argentinos).then(() => {
  imagenesPrecargadas = true;
  boton.disabled = false;
  boton.textContent = "Comenzar";
  console.log("Todas las imágenes fueron precargadas");
});

// ====== EVENTO CLICK ======
boton.addEventListener("click", () => {
  // Seguridad extra: si aún no cargaron (por red lenta)
  if (!imagenesPrecargadas) return;

  // Reproducir sonido al hacer click
  sonidoClick.currentTime = 0;
  sonidoClick.play().catch(() => {});

  // Evitar múltiples contadores simultáneos
  if (contadorActivo) return;

  contadorActivo = true;

  // 1) Vaciar las cajas inmediatamente
  cajaIzquierda.innerHTML = "";
  cajaDerecha.textContent = "";

  // 2) Elegir resultados ANTES del contador (revelación sincronizada)
  const indiceClub = Math.floor(Math.random() * clubes_argentinos.length);
  const clubAleatorio = clubes_argentinos[indiceClub];

  const indiceLetra = Math.floor(Math.random() * letras.length);
  const letraAleatoria = letras[indiceLetra];

  // 3) Cuenta regresiva desde 6
  let contador = 6;
  equis.textContent = contador;

  const intervalo = setInterval(() => {
    contador--;

    if (contador > 0) {
      equis.textContent = contador;
    } else {
      clearInterval(intervalo);

      // Volver a mostrar la X
      equis.textContent = "X";

      // Mostrar imagen (instantánea gracias a la precarga)
      cajaIzquierda.innerHTML = `<img src="${clubAleatorio}" alt="club">`;

      // Mostrar letra al mismo tiempo
      cajaDerecha.textContent = letraAleatoria;

      // Permitir nuevo click
      contadorActivo = false;
    }
  }, 1000);
});

