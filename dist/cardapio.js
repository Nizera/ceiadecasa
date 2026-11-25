const listaReceitas = document.querySelector("#lista-receitas");
const controles = document.querySelector(".carrossel-controles");
const anterior = controles.querySelector("[data-anterior]");
const proxima = controles.querySelector("[data-proxima]");
const posicao = controles.querySelector("#posicao-receitas");
const receitas = [...listaReceitas.children];
const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)");

function atualizarCarrossel() {
  const inicio = listaReceitas.scrollLeft;
  const fim = inicio + listaReceitas.clientWidth;
  const visiveis = receitas.filter((receita) => (
    receita.offsetLeft >= inicio - 2 && receita.offsetLeft + receita.offsetWidth <= fim + 2
  ));

  if (visiveis.length) {
    const primeira = receitas.indexOf(visiveis[0]) + 1;
    const ultima = primeira + visiveis.length - 1;
    posicao.textContent = primeira === ultima
      ? `${primeira} de ${receitas.length}`
      : `${primeira}–${ultima} de ${receitas.length}`;
  }

  anterior.setAttribute("aria-disabled", String(inicio <= 2));
  proxima.setAttribute("aria-disabled", String(fim >= listaReceitas.scrollWidth - 2));
}

function moverCarrossel(botao, direcao) {
  if (botao.getAttribute("aria-disabled") === "true") return;

  const passo = receitas[1].offsetLeft - receitas[0].offsetLeft;
  const indice = Math.round(listaReceitas.scrollLeft / passo) + direcao;
  listaReceitas.scrollTo({
    left: indice * passo,
    behavior: semAnimacao.matches ? "instant" : "smooth",
  });
}

anterior.addEventListener("click", () => moverCarrossel(anterior, -1));
proxima.addEventListener("click", () => moverCarrossel(proxima, 1));
listaReceitas.addEventListener("scroll", atualizarCarrossel, { passive: true });
window.addEventListener("resize", atualizarCarrossel);
atualizarCarrossel();
controles.hidden = false;
