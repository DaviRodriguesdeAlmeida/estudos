import socket, { conectarSocket } from "../services/socket.js";
import { buscarUsuario } from "../services/usuarioService.js";
import { iniciarCabecalho } from "../components/cabecalho.js";
import { iniciarModalSair } from "../components/modalSair.js";
import { obterUsuarioId } from "../state/sessao.js";
import { limparSalaAtual, obterSalaAtual, salvarSalaAtual } from "../state/salaAtual.js";
import { criarGerenciadorEventos } from "../utils/eventos.js";
import { mostrarMensagem } from "../utils/erros.js";

function preencherJogador(seletor, usuario) {
  const jogador = document.querySelector(seletor);
  jogador.querySelector("[data-nome-jogador]").textContent = usuario?.nome || usuario?.email || "Jogador";
  jogador.querySelector("[data-vitorias]").textContent = usuario?.vitorias || 0;
}

export async function iniciarJogo({ navegar }) {
  const eventos = criarGerenciadorEventos();
  const sala = obterSalaAtual();
  const mensagem = document.querySelector("#mensagem-jogo");

  if (!sala) {
    navegar("/inicio");
    return eventos.limpar;
  }

  iniciarCabecalho();
  iniciarModalSair(eventos, navegar);
  conectarSocket();

  document.querySelector("#nome-sala").textContent = sala.nome || "Sala sem nome";

  try {
    const usuario = await buscarUsuario(obterUsuarioId());
    const usuarioEhCriador = sala.criador_id === socket.id;
    preencherJogador(usuarioEhCriador ? "#jogador-1" : "#jogador-2", usuario);
  } catch {
    preencherJogador("#jogador-1", { nome: "Jogador 1" });
  }

  eventos.ouvir(document.querySelector("#sair-da-sala"), "click", () => {
    socket.emit("sair_sala", { id: sala.criador_id || sala.id });
    limparSalaAtual();
    navegar("/inicio");
  });

  eventos.ouvirSocket(socket, "receber_oponente", (dados) => {
    const atualizada = { ...sala, oponente_id: dados.oponente_id };
    salvarSalaAtual(atualizada);
    preencherJogador("#jogador-2", { nome: "Oponente conectado" });
    document.querySelector("#aguardando-jogador").hidden = true;
    document.querySelector("#iniciar-partida").hidden = false;
  });

  eventos.ouvirSocket(socket, "mensagem", (resposta) => {
    if (resposta.tipo === "entrar_sala" || resposta.tipo === "sair_sala") {
      mostrarMensagem(mensagem, resposta.mensagem, resposta.sucesso);
    }
  });

  return eventos.limpar;
}

