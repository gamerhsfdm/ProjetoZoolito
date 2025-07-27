class MobileNavbar {
  constructor(mobileMenu, navList, navLinks, overlay) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.overlay = document.querySelector(overlay); 
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.overlay.classList.toggle(this.activeClass);

    const isActive = this.mobileMenu.classList.contains(this.activeClass);
    this.mobileMenu.setAttribute("aria-expanded", isActive);

    this.animateLinks();
  }

  closeMenu() {
    this.navList.classList.remove(this.activeClass);
    this.mobileMenu.classList.remove(this.activeClass);
    this.overlay.classList.remove(this.activeClass);

    const isActive = this.mobileMenu.classList.contains(this.activeClass);
    this.mobileMenu.setAttribute("aria-expanded", isActive);
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
    this.navLinks.forEach((link) => {
      link.addEventListener("click", this.closeMenu);
    });
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
  ".menu-overlay" 
);
mobileNavbar.init();

function verModelos() {
  document.querySelector("#exposicao").scrollIntoView({ behavior: "smooth" });
}

function animateOnScroll() {
  const allElements = document.querySelectorAll(
    ".reveal, .reveal-right, .reveal-scroll, .reveal-up"
  );
  const windowHeight = window.innerHeight;
  const triggerBottom = windowHeight - 200;

  allElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < triggerBottom) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

document.querySelectorAll("#scroll-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
});

let indiceAtual = 0;
const track = document.getElementById("carrosselTrack");
const totalSlides = track.children.length;

function moverCarrossel(direcao) {
  indiceAtual += direcao;
  if (indiceAtual < 0) indiceAtual = totalSlides - 1;
  if (indiceAtual >= totalSlides) indiceAtual = 0;

  const largura = track.clientWidth;
  track.style.transform = `translateX(-${indiceAtual * largura}px)`;
}

window.addEventListener("resize", () => moverCarrossel(0));

const modal = document.getElementById("zoomModal");
const modalImg = document.getElementById("zoomImg");
const closeBtn = document.getElementsByClassName("close")[0];
const imagens = Array.from(document.querySelectorAll(".galeria img"));
let imagemAtual = 0;

document.querySelectorAll(".galeria img").forEach((img, index) => {
  img.addEventListener("click", () => {
    imagemAtual = index;
    abrirModal(img.src);
  });
});

function abrirModal(src) {
  modal.style.display = "block";
  modalImg.src = src;
  modalImg.style.transform = "scale(1)";
  currentX = currentY = 0;
  isZoomed = false;
}

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

let isZoomed = false;
let currentX = 0,
  currentY = 0,
  startX = 0,
  startY = 0;
let isDragging = false;

modalImg.addEventListener("dblclick", () => {
  isZoomed = !isZoomed;
  if (!isZoomed) {
    modalImg.style.transform = "scale(1)";
    currentX = currentY = 0;
  } else {
    modalImg.style.transform = "scale(2)";
  }
});

modalImg.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1 && isZoomed) {
    const touch = e.touches[0];
    startX = touch.clientX - currentX;
    startY = touch.clientY - currentY;
  }

  touchStartX = e.touches[0].clientX;
});

modalImg.addEventListener("touchmove", (e) => {
  if (isZoomed) {
    e.preventDefault();
    const touch = e.touches[0];
    currentX = touch.clientX - startX;
    currentY = touch.clientY - startY;
    modalImg.style.transform = `scale(2) translate(${currentX}px, ${currentY}px)`;
  }
});

let touchStartX = 0;
modalImg.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diffX = touchEndX - touchStartX;

  if (Math.abs(diffX) > 50 && !isZoomed) {
    if (diffX > 0) {
      imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
    } else {
      imagemAtual = (imagemAtual + 1) % imagens.length;
    }
    abrirModal(imagens[imagemAtual].src);
  }
});

modalImg.addEventListener("mousedown", (e) => {
  if (!isZoomed) return;
  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  modalImg.style.transform = `scale(2) translate(${currentX}px, ${currentY}px)`;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("keydown", (e) => {
  if (modal.style.display === "block" && !isZoomed) {
    if (e.key === "ArrowRight") {
      imagemAtual = (imagemAtual + 1) % imagens.length;
      abrirModal(imagens[imagemAtual].src);
    } else if (e.key === "ArrowLeft") {
      imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
      abrirModal(imagens[imagemAtual].src);
    } else if (e.key === "Escape") {
      modal.style.display = "none";
    }
  }
});

const btnAnterior = document.getElementById("btnAnterior");
const btnProximo = document.getElementById("btnProximo");

btnAnterior.addEventListener("click", () => {
  imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
  abrirModal(imagens[imagemAtual].src);
});

btnProximo.addEventListener("click", () => {
  imagemAtual = (imagemAtual + 1) % imagens.length;
  abrirModal(imagens[imagemAtual].src);
});

window.onscroll = function () {
  let botao = document.getElementById("btnTopo");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    botao.style.display = "block";
  } else {
    botao.style.display = "none";
  }
};

document.getElementById("btnTopo").onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};