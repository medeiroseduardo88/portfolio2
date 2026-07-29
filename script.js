/* =====================================================
   MODAL DE PROJETOS
===================================================== */
const modal = document.getElementById("modalProjeto");
const modalGaleria = document.getElementById("modal-galeria");
const modalTitulo = document.getElementById("modal-titulo");
const modalDescricao = document.getElementById("modal-descricao");
const modalTag = document.getElementById("modal-tag");
const fecharModalBtn = document.getElementById("fechar-modal");
const btnPrev = document.getElementById("modal-prev");
const btnNext = document.getElementById("modal-next");

let slideIndex = 0;

function abrirModal(card) {
    const imagens = JSON.parse(card.dataset.imagens || "[]");
    const titulo = card.dataset.titulo || "";
    const descricao = card.dataset.descricao || "";
    const tag = card.querySelector(".tag-projeto")?.textContent || "";

    modalTitulo.textContent = titulo;
    modalDescricao.textContent = descricao;
    modalTag.textContent = tag;

    modalGaleria.innerHTML = "";
    imagens.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = `${titulo} — imagem ${i + 1}`;
        if (i === 0) img.classList.add("slide-ativo");
        modalGaleria.appendChild(img);
    });

    slideIndex = 0;
    const temVariasImagens = imagens.length > 1;
    btnPrev.style.display = temVariasImagens ? "block" : "none";
    btnNext.style.display = temVariasImagens ? "block" : "none";

    modal.classList.add("aberto");
    requestAnimationFrame(() => modal.classList.add("visivel"));
    document.body.style.overflow = "hidden";
}

function fecharModal() {
    modal.classList.remove("visivel");
    document.body.style.overflow = "";
    setTimeout(() => modal.classList.remove("aberto"), 350);
}

document.querySelectorAll(".projetos-card").forEach((card) => {
    const btn = card.querySelector(".btn-ver-projeto");
    if (btn) {
        btn.addEventListener("click", () => abrirModal(card));
    }
});

fecharModalBtn.addEventListener("click", fecharModal);

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        fecharModal();
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("aberto")) {
        fecharModal();
    }
});

function mudarSlide(delta) {
    const slides = modalGaleria.querySelectorAll("img");
    if (slides.length === 0) return;

    slides[slideIndex].classList.remove("slide-ativo");
    slideIndex = (slideIndex + delta + slides.length) % slides.length;
    slides[slideIndex].classList.add("slide-ativo");
}

btnPrev.addEventListener("click", () => mudarSlide(-1));
btnNext.addEventListener("click", () => mudarSlide(1));

/* =====================================================
   TEMA CLARO / ESCURO
===================================================== */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "claro") {
    document.body.classList.add("light-theme");
    themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const claro = document.body.classList.contains("light-theme");
    themeIcon.classList.toggle("fa-moon", !claro);
    themeIcon.classList.toggle("fa-sun", claro);
    localStorage.setItem("tema", claro ? "claro" : "escuro");
});

/* =====================================================
   ENVIO DE MENSAGEM VIA WHATSAPP
===================================================== */
const formContato = document.getElementById("form-contato");

formContato.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !mensagem) return;

    const meuNumero = "5511969892900";
    const texto = `Olá Eduardo! Meu nome é ${nome}.\n\nMensagem: ${mensagem}`;
    const url = `https://wa.me/${meuNumero}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
    formContato.reset();
});

/* =====================================================
   MENU MOBILE
===================================================== */
const toggleBtn = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");

toggleBtn.addEventListener("click", () => {
    const aberto = menu.classList.toggle("ativo");
    toggleBtn.setAttribute("aria-expanded", String(aberto));
});

document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("ativo");
        toggleBtn.setAttribute("aria-expanded", "false");
    });
});

/* =====================================================
   SCROLL REVEAL
===================================================== */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll(".card-habilidade, .exp-item, .projetos-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
});

/* =====================================================
   ANO NO RODAPÉ
===================================================== */
const anoAtual = document.getElementById("ano-atual");
if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

/* =====================================================
   PARTÍCULAS DE FUNDO
===================================================== */
if (window.tsParticles) {
    tsParticles.load("tsparticles", {
        background: { color: "transparent" },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "bubble" }
            },
            modes: {
                grab: { distance: 180, links: { opacity: 0.6 } },
                bubble: { distance: 200, size: 6, duration: 0.5, opacity: 1 }
            }
        },
        particles: {
            number: { value: 33 },
            color: { value: ["#00bfff", "#7c3aed", "#22c55e"] },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true },
            size: { value: { min: 2, max: 5 }, random: true },
            move: {
                enable: true,
                speed: 0.6,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" }
            },
            links: { enable: true, distance: 130, opacity: 0.15, width: 1, color: "#ffffff" }
        },
        detectRetina: true
    });
}