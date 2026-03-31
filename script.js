/* =====================================================
   CONFIGURAÇÕES DE MODAL (EFEITO FADE-IN)
===================================================== */
const modal = document.getElementById("modalProjeto");

function abrirModal() {
    modal.style.display = "flex";
    modal.style.opacity = "0";
    // Pequeno delay para a transição de opacidade funcionar
    setTimeout(() => {
        modal.style.transition = "opacity 0.4s ease";
        modal.style.opacity = "1";
    }, 10);
}

function fecharModal() {
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.style.display = "none";
    }, 400); // Tempo da transição
}

// Fechar modal ao clicar fora da caixa branca
window.onclick = function(event) {
    if (event.target == modal) {
        fecharModal();
    }
}

/* =====================================================
   BOTÃO DE TEMA (DARK / LIGHT MODE)
===================================================== */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    
    if (document.body.classList.contains("light-theme")) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
    }
});

/* =====================================================
   ENVIO PARA WHATSAPP (LOGICA DE DADOS)
===================================================== */
function enviarWhats(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;
    const meuNumero = "55119XXXXXXXX"; // Coloque seu número aqui (com DDD)

    const texto = `Olá Eduardo! Meu nome é *${nome}*.\n\n*Mensagem:* ${mensagem}`;
    const url = `https://api.whatsapp.com/send?phone=${meuNumero}&text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
}

/* =====================================================
   SCROLL REVEAL (EFEITO DE SURGIMENTO)
===================================================== */
// Faz os elementos aparecerem suavemente enquanto você desce a página
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

// Aplicar aos cards e seções
document.querySelectorAll('.card-habilidade, .exp-item, .projetos-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
});

let slideIndex = 0;

// Garante que o modal e os elementos existam antes de rodar
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalProjeto");

    // Função para abrir o modal
    window.abrirModal = function(event) {
        // Se clicar no link do GitHub, não abre o modal
        if (event && (event.target.closest('a') || event.target.closest('i'))) {
            return;
        }

        if (modal) {
            modal.style.display = "flex";
            slideIndex = 0; // Sempre começa na primeira foto
            mostrarSlide(slideIndex);
            
            setTimeout(() => {
                modal.style.transition = "opacity 0.4s ease";
                modal.style.opacity = "1";
            }, 10);
        }
    };

    window.fecharModal = function() {
        if (modal) {
            modal.style.opacity = "0";
            setTimeout(() => {
                modal.style.display = "none";
            }, 400);
        }
    };

    // Fechar ao clicar fora da caixa
    window.onclick = function(event) {
        if (event.target == modal) {
            fecharModal();
        }
    };
});

// LÓGICA DA GALERIA
function mudarSlide(n) {
    mostrarSlide(slideIndex += n);
}

function mostrarSlide(n) {
    const slides = document.querySelectorAll(".galeria-slides img");
    if (slides.length === 0) return;

    // Loop infinito (volta ao início ou fim)
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    // Esconde todas e mostra a atual
    slides.forEach(img => {
        img.style.display = "none";
        img.classList.remove("slide-ativo");
    });

    slides[slideIndex].style.display = "block";
    slides[slideIndex].classList.add("slide-ativo");
}

