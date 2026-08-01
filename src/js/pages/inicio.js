import socket, { conectarSocket } from "../services/socket.js";
import { iniciarCabecalho } from "../components/cabecalho.js";
import { iniciarModalSair } from "../components/modalSair.js";
import { iniciarModalCriarSala } from "../components/modalCriarSala.js";
import { iniciarModalEntrarSala } from "../components/modalEntrarSala.js";
import { criarSalaCard } from "../components/salaCard.js";
import { salvarSalaAtual } from "../state/salaAtual.js";
import { criarGerenciadorEventos } from "../utils/eventos.js";
import { mostrarMensagem } from "../utils/erros.js";

export function iniciarInicio({ navegar }) {
  const eventos = criarGerenciadorEventos();
  const lista = document.querySelector("#lista-salas");
  const vazio = document.querySelector("#salas-vazias");
  const mensagem = document.querySelector("#mensagem-inicio");

  iniciarCabecalho();
  iniciarModalSair(eventos, navegar);

  const modalCriar = iniciarModalCriarSala(eventos, (dados) => {
    socket.emit("criar_sala", dados, (resposta) => {
      if (!resposta?.sucesso) return;

      salvarSalaAtual({ id: resposta.sala, ...dados, criador_id: socket.id });
      modalCriar.fechar();
      navegar("/jogo");
    });
  });

  const modalEntrar = iniciarModalEntrarSala(eventos, (dados) => {
    socket.emit("entrar_sala", dados);
  });

  function adicionarSala(sala) {
    if (!sala?.id || lista.querySelector(`[data-sala-id="${CSS.escape(sala.id)}"]`)) return;
    vazio?.remove();
    lista.appendChild(criarSalaCard(sala));
  }

  function entrarNaSala(sala) {
    if (sala.visibilidade === "privada") {
      modalEntrar.abrir(sala);
      return;
    }

    socket.emit("entrar_sala", sala);
  }

  eventos.ouvir(lista, "click", (evento) => {
    const botao = evento.target.closest("[data-entrar-sala]");
    if (!botao) return;

    const card = botao.closest("[data-sala-id]");
    entrarNaSala({
      id: card.dataset.salaId,
      nome: card.dataset.nome,
      visibilidade: card.dataset.visibilidade
    });
  });

  eventos.ouvirSocket(socket, "receber_sala", adicionarSala);
  eventos.ouvirSocket(socket, "mensagem", (resposta) => {
    console.log("Mensagem recebida do servidor:", resposta);

    if (!resposta.sucesso) {
      if (resposta.tipo === "criar_sala") modalCriar.mostrarErro(resposta.mensagem);
      else if (resposta.tipo === "entrar_sala") modalEntrar.mostrarErro(resposta.mensagem);
      else mostrarMensagem(mensagem, resposta.mensagem);
      return;
    }

    if (resposta.tipo === "entrar_sala") {
      salvarSalaAtual(resposta.adicional);
      modalEntrar.fechar();
      navegar("/jogo");
    }
  });

  eventos.ouvirSocket(socket, "connect", () => {
    console.log("Conectado ao servidor Socket.IO:", socket.id);
  });

  eventos.ouvirSocket(socket, "connect_error", () => {
    mostrarMensagem(mensagem, "Não foi possível conectar ao servidor do jogo.");
  });

  conectarSocket();
  return eventos.limpar;
}

