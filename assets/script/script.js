document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsNav = document.querySelector('.carousel-dots');

    let currentSlide = 0;

    // Criar dots dinamicamente
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      if (index === 0) dot.classList.add('active');
      dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);

    function updateCarousel() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentSlide].classList.add('active');
    }

    nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    });

    prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
      });
    });

    window.addEventListener('resize', updateCarousel);

    updateCarousel(); // Garantir que começa ajustado
  });
class MobileNavbar {
  constructor(mobileMenu, navList, navLinks, overlay) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.overlay = document.querySelector(overlay); // Adicionando a overlay
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  } 

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.overlay.classList.toggle(this.activeClass); // Mostra/Esconde a overlay

    const isActive = this.mobileMenu.classList.contains(this.activeClass);
    this.mobileMenu.setAttribute("aria-expanded", isActive);
  
    this.animateLinks();
  }

  closeMenu() {
    this.navList.classList.remove(this.activeClass);
    this.mobileMenu.classList.remove(this.activeClass);
    this.overlay.classList.remove(this.activeClass); // Remove a overlay

    const isActive = this.mobileMenu.classList.contains(this.activeClass);
    this.mobileMenu.setAttribute("aria-expanded", isActive);
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);

    // Fecha o menu quando um item da navegação é clicado
    this.navLinks.forEach(link => {
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
  ".menu-overlay" // Passando o seletor da overlay
);
mobileNavbar.init();


// Função de alerta para redirecionamento aos modelos 3D
function verModelos() {
    document.querySelector('#exposicao').scrollIntoView({ behavior: 'smooth' });
  }

// Função geral para animar elementos ao rolar a página
function animateOnScroll() {
    const allElements = document.querySelectorAll(".reveal, .reveal-right, .reveal-scroll, .reveal-up");
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight - 200;

    allElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
}

// Função para o comportamento de rolagem suave
document.querySelectorAll('#scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            }); 
        }
    });
});

// Aplica a animação no carregamento e ao rolar
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);


document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();  
});

let indiceAtual = 0;
  const track = document.getElementById('carrosselTrack');
  const totalSlides = track.children.length;

  function moverCarrossel(direcao) {
    indiceAtual += direcao;
    if (indiceAtual < 0) indiceAtual = totalSlides - 1;
    if (indiceAtual >= totalSlides) indiceAtual = 0;

    const largura = track.clientWidth;
    track.style.transform = `translateX(-${indiceAtual * largura}px)`;
  }

  window.addEventListener('resize', () => moverCarrossel(0)); // reajusta no redimensionamento

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
  
  // === Zoom e arrastar ===
  let isZoomed = false;
  let currentX = 0, currentY = 0, startX = 0, startY = 0;
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
  
  // Toque para arrastar quando em zoom
  modalImg.addEventListener("touchstart", e => {
    if (e.touches.length === 1 && isZoomed) {
      const touch = e.touches[0];
      startX = touch.clientX - currentX;
      startY = touch.clientY - currentY;
    }
  
    // Início do swipe
    touchStartX = e.touches[0].clientX;
  });
  
  modalImg.addEventListener("touchmove", e => {
    if (isZoomed) {
      e.preventDefault();
      const touch = e.touches[0];
      currentX = touch.clientX - startX;
      currentY = touch.clientY - startY;
      modalImg.style.transform = `scale(2) translate(${currentX}px, ${currentY}px)`;
    }
  });
  
  // === SWIPE lateral para navegar ===
  let touchStartX = 0;
  modalImg.addEventListener("touchend", e => {
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
  
  // Mouse arrasto em zoom
  modalImg.addEventListener("mousedown", e => {
    if (!isZoomed) return;
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
  });
  
  window.addEventListener("mousemove", e => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    modalImg.style.transform = `scale(2) translate(${currentX}px, ${currentY}px)`;
  });
  
  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // === Teclas de seta para navegação no desktop ===
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



  // Mostra o botão quando rolar a página pra baixo
window.onscroll = function () {
  let botao = document.getElementById("btnTopo");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    botao.style.display = "block";
  } else {
    botao.style.display = "none";
  }
};

// Função pra voltar ao topo
document.getElementById("btnTopo").onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};