import { desconectarSocket } from "../services/socket.js";
import { limparSessao } from "../state/sessao.js";
import { limparSalaAtual } from "../state/salaAtual.js";

export function iniciarModalSair(eventos, navegar) {
  const dialog = document.querySelector("#dialog-sair");
  const abrir = document.querySelector("#abrir-modal-sair");
  const confirmar = document.querySelector("#confirmar-sair");

  eventos.ouvir(abrir, "click", () => dialog.showModal());
  eventos.ouvir(confirmar, "click", () => {
    desconectarSocket();
    limparSessao();
    limparSalaAtual();
    navegar("/login");
  });
}

