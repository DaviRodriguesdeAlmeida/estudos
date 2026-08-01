import { carregarPagina, carregarComponentes } from "../utils/carregarHtml.js";
import { carregarCss } from "../utils/carregarCss.js";

let limparPaginaAtual = null;
let numeroNavegacao = 0;

export async function renderizarPagina(configuracao, contexto) {
  const navegacaoAtual = ++numeroNavegacao;

  limparPaginaAtual?.();
  limparPaginaAtual = null;

  carregarCss(configuracao.css);
  await carregarPagina(configuracao.html);
  await carregarComponentes(configuracao.componentes);

  if (navegacaoAtual !== numeroNavegacao) return;

  limparPaginaAtual = await configuracao.iniciar(contexto);
  contexto.atualizarLinks();
}

