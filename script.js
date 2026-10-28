document.documentElement.classList.add("js");

/* =====================================================
   TEMA CLARO / ESCURO
===================================================== */
const botaoTema = document.getElementById("botao-tema");
const iconeTema = document.getElementById("icone-tema");

function aplicarTemaSalvo() {
    let temaSalvo = null;
    try { temaSalvo = localStorage.getItem("tema"); } catch (e) {}
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
    try { localStorage.setItem("tema", claro ? "claro" : "escuro"); } catch (e) {}
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
document.querySelectorAll(".menu-link").forEach((link) => link.addEventListener("click", fecharMenu));

/* =====================================================
   ENVIO DE MENSAGEM VIA WHATSAPP
===================================================== */
const NUMERO_WHATSAPP = "5511969892900";
const formularioContato = document.getElementById("formulario-contato");

formularioContato.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    if (!nome || !mensagem) return;

    const texto = `Olá Eduardo! Meu nome é ${nome}.\n\nMensagem: ${mensagem}`;
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank");
    formularioContato.reset();
});

/* =====================================================
   REVELAR CONTEÚDO AO ROLAR
   Cada grupo entra em cascata (um depois do outro).
===================================================== */
const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const gruposDeRevelacao = [
    { seletor: ".sobre .eyebrow, .experiencia .eyebrow, .tecnologias .eyebrow, .projetos .eyebrow, .formacao .eyebrow, .contatos .eyebrow", tipo: "" },
    { seletor: "section h2", tipo: "" },
    { seletor: ".sobre-caixa", tipo: "" },
    { seletor: ".experiencia .exp-item, .formacao .exp-item", tipo: "reveal-esq" },
    { seletor: ".card-habilidade", tipo: "" },
    { seletor: ".projetos-card", tipo: "" },
    { seletor: ".card-certificado", tipo: "" },
    { seletor: ".formulario-contato", tipo: "reveal-dir" },
    { seletor: "footer > *", tipo: "" }
];

const observadorDeScroll = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        const el = entrada.target;
        el.classList.add("in");
        observadorDeScroll.unobserve(el);

        // Depois da animação, devolve o elemento ao CSS normal (evita atraso no hover)
        if (el.classList.contains("reveal")) {
            setTimeout(() => el.classList.remove("reveal", "reveal-esq", "reveal-dir", "in"), 1800);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

if (!reduzirMovimento) {
    gruposDeRevelacao.forEach(({ seletor, tipo }) => {
        document.querySelectorAll(seletor).forEach((el) => {
            const irmaos = Array.from(el.parentElement.children).filter((c) => c.matches(seletor));
            const posicao = irmaos.indexOf(el);
            el.style.setProperty("--d", `${(posicao % 4) * 110}ms`);
            el.classList.add("reveal");
            if (tipo) el.classList.add(tipo);
            observadorDeScroll.observe(el);
        });
    });
}

// Linhas do tempo se desenham sozinhas
document.querySelectorAll(".linha-do-tempo").forEach((linha) => {
    if (reduzirMovimento) return linha.classList.add("in");
    observadorDeScroll.observe(linha);
});

/* =====================================================
   BARRA DE PROGRESSO + LINK ATIVO NO MENU
===================================================== */
const barra = document.createElement("div");
barra.className = "progresso";
barra.setAttribute("aria-hidden", "true");
document.body.prepend(barra);

let aguardandoFrame = false;
window.addEventListener("scroll", () => {
    if (aguardandoFrame) return;
    aguardandoFrame = true;
    requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        barra.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
        aguardandoFrame = false;
    });
}, { passive: true });

const linksMenu = document.querySelectorAll(".menu-link");
const observadorDeSecao = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        linksMenu.forEach((l) => l.classList.toggle("ativo-link", l.getAttribute("href") === `#${entrada.target.id}`));
    });
}, { rootMargin: "-45% 0px -50% 0px" });

document.querySelectorAll("main[id], section[id]").forEach((s) => observadorDeSecao.observe(s));

/* =====================================================
   HOLOFOTE QUE SEGUE O MOUSE NOS CARDS
===================================================== */
document.querySelectorAll(".card-habilidade, .projetos-card, .card-certificado, .sobre-caixa").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
});

/* =====================================================
   ANO NO RODAPÉ
===================================================== */
const anoAtual = document.getElementById("ano-atual");
if (anoAtual) anoAtual.textContent = new Date().getFullYear();

/* =====================================================
   PARTÍCULAS DE FUNDO
===================================================== */
if (window.tsParticles && !reduzirMovimento) {
    tsParticles.load("tsparticles", {
        background: { color: "transparent" },
        fpsLimit: 60,
        interactivity: {
            events: { onHover: { enable: true, mode: "grab" } },
            modes: { grab: { distance: 180, links: { opacity: 0.6 } } }
        },
        particles: {
            number: { value: 33 },
            color: { value: ["#3cc4b5", "#f0b452"] },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true },
            size: { value: { min: 2, max: 4 } },
            move: { enable: true, speed: 0.6, direction: "none", random: true, outModes: { default: "out" } },
            links: { enable: true, distance: 130, opacity: 0.15, width: 1, color: "#9db3ae" }
        },
        detectRetina: true
    });
}