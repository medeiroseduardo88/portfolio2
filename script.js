/* =====================================================
   MODAL PROJETOS
===================================================== */

const modal = document.getElementById("modalProjeto");
let slideIndex = 0;

// Abrir modal
function abrirModal(event) {

    // Impede abrir ao clicar em links
    if (event && (event.target.closest("a") || event.target.closest("i"))) {
        return;
    }

    modal.style.display = "flex";
    modal.style.opacity = "0";

    slideIndex = 0;
    mostrarSlide(slideIndex);

    setTimeout(() => {
        modal.style.transition = "opacity 0.4s ease";
        modal.style.opacity = "1";
    }, 10);
}

// Fechar modal
function fecharModal() {
    modal.style.opacity = "0";

    setTimeout(() => {
        modal.style.display = "none";
    }, 400);
}

// Fechar clicando fora
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        fecharModal();
    }
});


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    // Troca ícone
    if (document.body.classList.contains("light-theme")) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
    }
});


/* =====================================================
   ENVIO WHATSAPP
===================================================== */

function enviarWhats(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;

    // Seu número
    const meuNumero = "5511969892900";

    const texto =
        `Olá Eduardo! Meu nome é ${nome}.%0A%0AMensagem: ${mensagem}`;

    const url =
        `https://wa.me/${meuNumero}?text=${texto}`;

    window.open(url, "_blank");
}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });

}, observerOptions);


// Elementos animados
document.querySelectorAll(
    ".card-habilidade, .exp-item, .projetos-card"
).forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";

    observer.observe(el);
});


/* =====================================================
   GALERIA DO MODAL
===================================================== */

function mudarSlide(n) {

    mostrarSlide(slideIndex += n);
}

function mostrarSlide(n) {

    const slides =
        document.querySelectorAll(".galeria-slides img");

    if (slides.length === 0) return;

    // Loop infinito
    if (n >= slides.length) {
        slideIndex = 0;
    }

    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    // Esconde todos
    slides.forEach(img => {

        img.style.display = "none";
        img.classList.remove("slide-ativo");
    });

    // Mostra atual
    slides[slideIndex].style.display = "block";
    slides[slideIndex].classList.add("slide-ativo");
}


/* =====================================================
   MENU MOBILE
===================================================== */

const toggleBtn =
    document.getElementById("menu-toggle");

const menu =
    document.querySelector(".menu");

toggleBtn.addEventListener("click", () => {

    menu.classList.toggle("ativo");
});


// Fecha menu ao clicar em um link
document.querySelectorAll(".menu-link").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("ativo");
    });
});