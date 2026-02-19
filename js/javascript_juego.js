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

// ====== COLORES PARA MODO 2 ======
const colores = [
  "#d11928", // rojo
  "#1410d6", // azul
  "#069c06", // verde
  "#f09308", // naranja
  "#ffee00", // amarillo
  "#ffffff", // blanco
  "#000000", // negro
];

// ====== LETRAS A-Z ======
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ====== REFERENCIAS DOM ======
const boton = document.getElementById("btn-comenzar");
const cajaIzquierda = document.getElementById("caja-izquierda");
const cajaDerecha = document.getElementById("caja-derecha");
const equis = document.querySelector(".equis");
const radiosModo = document.querySelectorAll('input[name="modo"]');
const tituloJuego = document.getElementById("titulo-juego");

// ====== VARIABLES DE CONTROL ======
let contadorActivo = false;
let imagenesPrecargadas = false;

// ====== OBTENER MODO ACTUAL ======
function obtenerModo() {
  const seleccionado = document.querySelector('input[name="modo"]:checked');
  return seleccionado ? seleccionado.value : "v1";
}

// ====== ACTUALIZAR TÍTULO SEGÚN MODO ======
function actualizarTitulo() {
  const modo = obtenerModo();

  if (modo === "v1") {
    tituloJuego.textContent = "Nombra al jugador que pasó por este Club";
  }

  if (modo === "v2") {
    tituloJuego.textContent = "Nombra al Club que lleva estos colores en su Uniforme";
  }
}

// ====== CAMBIAR TÍTULO AL CAMBIAR DE MODO ======
radiosModo.forEach((radio) => {
  radio.addEventListener("change", () => {
    actualizarTitulo();

    // Reset visual al cambiar modo (evita confusión visual)
    cajaIzquierda.innerHTML = "";
    cajaDerecha.textContent = "";
    cajaIzquierda.style.backgroundColor = "black";
    cajaDerecha.style.backgroundColor = "black";
  });
});


// ====== FUNCIÓN DE PRECARGA REAL ======
function precargarImagenes(rutas) {
  return Promise.all(
    rutas.map((ruta) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = ruta;

        img.onload = () => resolve();
        img.onerror = () => {
          console.warn("No se pudo cargar:", ruta);
          resolve();
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
  console.log("Imágenes precargadas correctamente");
});

// ====== EVENTO CLICK ======
boton.addEventListener("click", () => {
  if (!imagenesPrecargadas) return;
  if (contadorActivo) return;

  // Reproducir sonido
  sonidoClick.currentTime = 0;
  sonidoClick.play().catch(() => {});

  contadorActivo = true;

  // Obtener modo seleccionado EN TIEMPO REAL
  const modo = obtenerModo();

  // Reset visual inmediato (clave para sincronización)
  cajaIzquierda.innerHTML = "";
  cajaDerecha.textContent = "";
  cajaIzquierda.style.backgroundColor = "black";
  cajaDerecha.style.backgroundColor = "black";

  // ====== CUENTA REGRESIVA ======
  let contador = 6;
  equis.textContent = contador;

  const intervalo = setInterval(() => {
    contador--;

    if (contador > 0) {
      equis.textContent = contador;
    } else {
      clearInterval(intervalo);
      equis.textContent = "X";

      // ====== MODO 1: CLUB + LETRA ======
      if (modo === "v1") {
        const indiceClub = Math.floor(Math.random() * clubes_argentinos.length);
        const clubAleatorio = clubes_argentinos[indiceClub];

        const indiceLetra = Math.floor(Math.random() * letras.length);
        const letraAleatoria = letras[indiceLetra];

        // Imagen instantánea (ya precargada)
        cajaIzquierda.innerHTML = `<img src="${clubAleatorio}" alt="club">`;

        // Letra sincronizada
        cajaDerecha.textContent = letraAleatoria;
      }
      
      // ====== MODO 2: COLORES EN FORMA DE CÍRCULO ======
      if (modo === "v2") {
        const colorIzq = colores[Math.floor(Math.random() * colores.length)];
        const colorDer = colores[Math.floor(Math.random() * colores.length)];

        // Crear círculos de color dentro de las cajas
        cajaIzquierda.innerHTML = `
          <div class="circulo-color" style="background-color: ${colorIzq};"></div>
        `;

        cajaDerecha.innerHTML = `
          <div class="circulo-color" style="background-color: ${colorDer};"></div>
        `;
      }

      contadorActivo = false;
    }
  }, 1000);
});
