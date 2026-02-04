// Troque para o número do WhatsApp do negócio (com DDI). Ex: 55 + DDD + número
const WHATS_PHONE = "5567999999999"; // <-- TROQUE AQUI

function buildWhatsLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATS_PHONE}?text=${text}`;
}

// CTA gerais
const ctaWhatsHero = document.getElementById("ctaWhatsHero");
const ctaWhatsCard = document.getElementById("ctaWhatsCard");
const ctaWhatsFooter = document.getElementById("ctaWhatsFooter");
const floatingWA = document.getElementById("floatingWA");

// Form
const leadName = document.getElementById("leadName");
const leadProblem = document.getElementById("leadProblem");
const leadType = document.getElementById("leadType");
const sendLead = document.getElementById("sendLead");

// Mobile nav
const navToggle = document.querySelector(".navToggle");
const mobileNav = document.getElementById("mobileNav");

navToggle?.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  mobileNav.hidden = expanded;
});

// Serviços (cards com CTA)
const services = [
  {
    title: "Formatação com backup",
    badge: "Popular",
    desc: "Instalação limpa, drivers, programas essenciais e backup dos seus arquivos.",
    prompt: "Quero formatação com backup."
  },
  {
    title: "Notebook lento / travando",
    badge: "Performance",
    desc: "Otimização, limpeza de software e diagnóstico de gargalos.",
    prompt: "Meu notebook está lento/travando. Quero orçamento."
  },
  {
    title: "Upgrade SSD / RAM",
    badge: "Custo-benefício",
    desc: "Recomendação do melhor upgrade e instalação com migração do sistema.",
    prompt: "Quero fazer upgrade (SSD/RAM)."
  },
  {
    title: "Wi-Fi e Rede local",
    badge: "Casa/Empresa",
    desc: "Configuração de roteador, repetidor, cabeamento e estabilidade da rede.",
    prompt: "Preciso de ajuda com Wi-Fi/rede local."
  },
  {
    title: "Remoção de vírus",
    badge: "Segurança",
    desc: "Limpeza, varredura e reforço de segurança do sistema.",
    prompt: "Acho que meu PC está com vírus. Preciso de ajuda."
  },
  {
    title: "Suporte remoto",
    badge: "Rápido",
    desc: "Resolução de problemas via acesso remoto (quando possível).",
    prompt: "Preciso de suporte remoto."
  }
];

const serviceGrid = document.getElementById("serviceGrid");
serviceGrid.innerHTML = services.map((s) => `
  <article class="service">
    <div class="row">
      <h3>${s.title}</h3>
      <span class="badge">${s.badge}</span>
    </div>
    <p>${s.desc}</p>
    <button class="serviceBtn" type="button" data-prompt="${s.prompt}">
      Pedir orçamento no WhatsApp
    </button>
  </article>
`).join("");

serviceGrid.querySelectorAll("[data-prompt]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const p = btn.getAttribute("data-prompt") || "Quero orçamento.";
    window.open(buildWhatsLink(`Olá! ${p}`), "_blank", "noopener");
  });
});

// Planos
document.querySelectorAll(".planBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = btn.getAttribute("data-plan") || "Plano";
    window.open(buildWhatsLink(`Olá! Tenho interesse no plano *${plan}*. Pode me explicar como funciona?`), "_blank", "noopener");
  });
});

function refreshCTAs() {
  const msg = "Olá! Quero um orçamento de suporte/assistência. Pode me ajudar?";
  const link = buildWhatsLink(msg);
  ctaWhatsHero.href = link;
  ctaWhatsCard.href = link;
  ctaWhatsFooter.href = link;
  floatingWA.href = link;
}
refreshCTAs();

sendLead?.addEventListener("click", () => {
  const name = (leadName.value || "").trim();
  const problem = (leadProblem.value || "").trim();
  const type = leadType?.value || "Serviço";

  const finalMsg =
    `Olá! Meu nome é ${name || "—"}. Tipo: *${type}*. ${problem || "Quero um orçamento, por favor."}`;

  window.open(buildWhatsLink(finalMsg), "_blank", "noopener");
});
