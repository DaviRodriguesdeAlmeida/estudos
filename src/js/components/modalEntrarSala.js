import { mostrarMensagem } from "../utils/erros.js";

export function iniciarModalEntrarSala(eventos, aoEntrar) {
  const dialog = document.querySelector("#dialog-entrar-sala");
  const form = document.querySelector("#form-entrar-sala");
  const cancelar = document.querySelector("#cancelar-entrar-sala");
  const nome = document.querySelector("#nome-sala-selecionada");
  const mensagem = document.querySelector("#mensagem-entrar-sala");
  let salaSelecionada = null;

  eventos.ouvir(cancelar, "click", () => dialog.close());
  eventos.ouvir(form, "submit", (evento) => {
    evento.preventDefault();
    if (!salaSelecionada) return;

    mostrarMensagem(mensagem);
    const { senha } = Object.fromEntries(new FormData(form));
    aoEntrar({ ...salaSelecionada, senha });
  });

  return {
    abrir(sala) {
      salaSelecionada = sala;
      nome.textContent = sala.nome;
      form.reset();
      mostrarMensagem(mensagem);
      dialog.showModal();
    },
    fechar() {
      salaSelecionada = null;
      form.reset();
      dialog.close();
    },
    mostrarErro(texto) {
      mostrarMensagem(mensagem, texto);
    }
  };
}

