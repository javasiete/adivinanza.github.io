// Precargar sonido de click
const sonidoClick = new Audio("sonidos/click.wav");
sonidoClick.preload = "auto";

// Precargar imágenes de clubes en caché
function precargarImagenes(rutas) {
  rutas.forEach((ruta) => {
    const img = new Image();
    img.src = ruta;
  });
}

// Array de clubes argentinos (rutas de imágenes)
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

// Letras de la A a la Z
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Referencias a los elementos del HTML
const boton = document.getElementById("btn-comenzar");
const cajaIzquierda = document.getElementById("caja-izquierda");
const cajaDerecha = document.getElementById("caja-derecha");
const equis = document.querySelector(".equis");

// Variable para evitar múltiples contadores a la vez
let contadorActivo = false;

// Evento al hacer click en "Comenzar"
boton.addEventListener("click", () => {
  // Reproducir sonido al hacer click
  sonidoClick.currentTime = 0; // reinicia por si se hace click rápido
  sonidoClick.play();

  // Si ya hay un contador corriendo, no hacer nada
  if (contadorActivo) return;

  contadorActivo = true;

  // 1) Vaciar las cajas
  cajaIzquierda.innerHTML = "";
  cajaDerecha.textContent = "";

  // 2) Generar los resultados ANTES (pero no mostrarlos aún)
  const indiceClub = Math.floor(Math.random() * clubes_argentinos.length);
  const clubAleatorio = clubes_argentinos[indiceClub];

  const indiceLetra = Math.floor(Math.random() * letras.length);
  const letraAleatoria = letras[indiceLetra];

  // 3) Iniciar cuenta regresiva desde 6
  let contador = 6;
  equis.textContent = contador;

  const intervalo = setInterval(() => {
    contador--;

    if (contador > 0) {
      equis.textContent = contador;
    } else {
      clearInterval(intervalo);

      equis.textContent = "X";

      cajaIzquierda.innerHTML = `
        <img src="${clubAleatorio}" alt="club">
      `;

      cajaDerecha.textContent = letraAleatoria;

      contadorActivo = false;
    }
  }, 1000);
});

