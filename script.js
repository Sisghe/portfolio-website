// ==========================
// SCRIPT.JS – Portfolio Andrea Ercoli
// ==========================

console.log("🚀 Portfolio attivo! Benvenuto da Andrea!");

// Scroll fluido tra le sezioni della pagina
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
// ==========================
// Scrittura con suono + pausa tra paragrafi + cursore attivo
// ==========================

const fullText = `Studente di Informatica presso l'Università La Sapienza di Roma, con formazione in Sicurezza Informatica e forte passione per lo sviluppo web. Il mio obiettivo è diventare Full Stack Web Developer.

Attualmente mi concentro sul Front-End: HTML5, CSS3, JavaScript. Sono motivato a crescere come sviluppatore in un ambiente professionale e dinamico.`;

let charIndex = 0;
const typingSpeed = 30;
const pauseAfterPeriod = 800; // millisecondi di pausa tra i paragrafi
const contentSpan = document.getElementById("typed-content");
const cursorSpan = document.querySelector(".cursor");

// Caricamento suono
const typingSound = new Audio("assets/sounds/typing.mp3");

function typeText() {
  if (charIndex < fullText.length) {
    const char = fullText.charAt(charIndex);
    contentSpan.textContent += char;
    charIndex++;

    // Riproduci suono solo per caratteri visibili
    if (char !== ' ' && char !== '\n') {
      typingSound.currentTime = 0;
      typingSound.play();
    }

    // Se incontra il punto e a capo, fa una pausa più lunga
    if (char === '.') {
      setTimeout(typeText, pauseAfterPeriod);
    } else {
      setTimeout(typeText, typingSpeed);
    }
  } else {
    // Testo finito: cursore resta lampeggiante
    cursorSpan.classList.add("cursor");
  }
}

window.addEventListener('DOMContentLoaded', typeText);




// ==========================
// ANIMAZIONE SFONDO "COSMIC RAIN"
// ==========================

const canvas = document.getElementById("space-bg");
const ctx = canvas.getContext("2d");

let w, h;
let elements = [];
const count = 100;

// Funzione per generare gli elementi iniziali
function init() {
  canvas.width = w = window.innerWidth;
  canvas.height = h = window.innerHeight;
  elements = [];

  for (let i = 0; i < count; i++) {
    elements.push({
      x: Math.random() * w,
      y: Math.random() * h,
      len: Math.random() > 0.5 ? 2 : 6, // puntino o trattino
      speed: 0.5 + Math.random() * 1.5,
      opacity: 0.2 + Math.random() * 0.5
    });
  }
}

// Funzione animazione
function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 1;

  for (let el of elements) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255,255,255,${el.opacity})`;
    ctx.moveTo(el.x, el.y);
    ctx.lineTo(el.x - el.len, el.y + el.len * 2);
    ctx.stroke();

    el.x -= 0.3;
    el.y += el.speed;

    // Ritorna in alto se esce dallo schermo
    if (el.y > h || el.x < 0) {
      el.x = Math.random() * w;
      el.y = -10;
    }
  }

  requestAnimationFrame(animate);
}

// Resize dinamico
window.addEventListener("resize", init);

// Inizio animazione
init();
animate();



// ==========================
// Ingrandimento CV al click
// ==========================

const cvThumb = document.getElementById("cv-thumb");
const cvOverlay = document.getElementById("cv-overlay");
const closeOverlay = document.getElementById("close-overlay");

cvThumb.addEventListener("click", () => {
  cvOverlay.style.display = "flex";
});

closeOverlay.addEventListener("click", () => {
  cvOverlay.style.display = "none";
});
