/* =====================================================
   TEMA CLARO / ESCURO
===================================================== */
const botaoTema = document.getElementById("botao-tema");
const iconeTema = document.getElementById("icone-tema");

function aplicarTemaSalvo() {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "claro") {
        document.body.classList.add("light-theme");
        iconeTema.classList.replace("fa-moon", "fa-sun");
    }
}

function alternarTema() {
    document.body.classList.toggle("light-theme");
    const claro = document.body.classList.contains("light-theme");
    iconeTema.classList.toggle("fa-moon", !claro);
    iconeTema.classList.toggle("fa-sun", claro);
    localStorage.setItem("tema", claro ? "claro" : "escuro");
}

aplicarTemaSalvo();
botaoTema.addEventListener("click", alternarTema);

/* =====================================================
   MENU MOBILE
===================================================== */
const botaoMenu = document.getElementById("botao-menu");
const menu = document.querySelector(".menu");

function alternarMenu() {
    const aberto = menu.classList.toggle("ativo");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
}

function fecharMenu() {
    menu.classList.remove("ativo");
    botaoMenu.setAttribute("aria-expanded", "false");
}

botaoMenu.addEventListener("click", alternarMenu);
document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", fecharMenu);
});

/* =====================================================
   ENVIO DE MENSAGEM VIA WHATSAPP
===================================================== */
const NUMERO_WHATSAPP = "5511969892900";
const formularioContato = document.getElementById("formulario-contato");

function enviarMensagemPeloWhatsapp(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !mensagem) return;

    const texto = `Olá Eduardo! Meu nome é ${nome}.\n\nMensagem: ${mensagem}`;
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
    formularioContato.reset();
}

formularioContato.addEventListener("submit", enviarMensagemPeloWhatsapp);

/* =====================================================
   ANIMAÇÃO AO ROLAR A PÁGINA (scroll reveal)
===================================================== */
const observadorDeScroll = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";
                observadorDeScroll.unobserve(entrada.target);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll(".card-habilidade, .exp-item, .projetos-card").forEach((elemento) => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(30px)";
    elemento.style.transition = "all 0.6s ease-out";
    observadorDeScroll.observe(elemento);
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