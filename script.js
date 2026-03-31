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