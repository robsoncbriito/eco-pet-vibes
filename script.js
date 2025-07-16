// Alternância de tema claro/escuro
const darkModeButton = document.getElementById("btn-toggle-dark");
darkModeButton?.addEventListener("click", () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
});

// Slideshow de Fundo 
const heroSection = document.querySelector('.hero');

if (!heroSection) {
    console.error('Elemento .hero não encontrado no DOM');
    throw new Error('Elemento .hero não encontrado');
}

const images = [
    './img/img-bg-1.jpg',
    './img/img-bg-2.jpg',
    './img/img-bg-3.jpg',
    './img/img-bg-4.jpg',
    './img/img-bg-5.jpg',
    './img/img-bg-6.jpg'
];

images.forEach(image => {
  const img = new Image();
  img.src = image;
  img.onload = () => console.log(`${image} carregada com sucesso`);
  img.onerror = () => console.error(`${image} não pôde ser carregada`);
});

let currentIndex = 0;

function changeBackground() {
    currentIndex = (currentIndex + 1) % images.length;
    heroSection.style.backgroundImage = `url(${images[currentIndex]})`
}

setInterval(changeBackground, 5000);
heroSection.style.backgroundImage = `url(${images[currentIndex]})`;

// =======================
// CARROSSEL DE PETS — COMPLETO E FUNCIONAL
// =======================
const carousel = document.querySelector(".pets-grid");

const cardWidth = 330;
let isHovered = false;
let autoScroll;

// Duplicar os cards para efeito de loop contínuo
const cards = Array.from(carousel.children);
cards.forEach(card => {
  const clone = card.cloneNode(true);
  clone.classList.add("clone");
  carousel.appendChild(clone);
});

// Início 
carousel.scrollLeft = 0;

// Scroll automático
function startAutoScroll() {
  autoScroll = setInterval(() => {
    if (!isHovered) {
      carousel.scrollLeft += 1;

      // Verifica se chegou no meio (fim da lista original)
      if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 1) {
        carousel.scrollLeft = 0;
      }
    }
  }, 16); // ~60fps 
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

// Botões manuais 
function manualScroll(direction) {
  stopAutoScroll();
  carousel.scrollBy({ left: direction * cardWidth, behavior: "smooth" });

  // Aguarda um pouco e retoma o auto scroll
  setTimeout(() => {
    startAutoScroll();
  }, 500);
}

// Pausar scroll ao passar o mouse 
carousel.addEventListener("mouseenter", () => {
  isHovered = true;
});

carousel.addEventListener("mouseleave", () => {
  isHovered = false;
});

// Iniciar
startAutoScroll();

// =======================
// ANIMAÇÕES SCROLL (fade-in / slide-up)
// =======================
const animatedElements = document.querySelectorAll(
  ".info-section, .step, .about-section, .contact-section, .pet-card, .footer"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

animatedElements.forEach(el => {
  el.classList.add("animate-hidden");
  observer.observe(el);
});