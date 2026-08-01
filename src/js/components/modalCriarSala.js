import { mostrarMensagem } from "../utils/erros.js";

export function iniciarModalCriarSala(eventos, aoCriar) {
  const dialog = document.querySelector("#dialog-criar-sala");
  const form = document.querySelector("#form-criar-sala");
  const abrir = document.querySelector("#abrir-criar-sala");
  const cancelar = document.querySelector("#cancelar-criar-sala");
  const visibilidade = document.querySelector("#visibilidade-da-sala");
  const grupoSenha = document.querySelector("#grupo-senha-sala");
  const senha = document.querySelector("#senha-da-sala");
  const mensagem = document.querySelector("#mensagem-criar-sala");

  function atualizarSenha() {
    const privada = visibilidade.value === "privada";
    grupoSenha.hidden = !privada;
    senha.required = privada;
    if (!privada) senha.value = "";
  }

  eventos.ouvir(abrir, "click", () => dialog.showModal());
  eventos.ouvir(cancelar, "click", () => dialog.close());
  eventos.ouvir(visibilidade, "change", atualizarSenha);
  eventos.ouvir(form, "submit", (evento) => {
    evento.preventDefault();
    mostrarMensagem(mensagem);

    const dados = Object.fromEntries(new FormData(form));
    if (dados.visibilidade === "publica") dados.senha = null;
    aoCriar(dados);
  });

  atualizarSenha();

  return {
    fechar() {
      form.reset();
      atualizarSenha();
      dialog.close();
    },
    mostrarErro(texto) {
      mostrarMensagem(mensagem, texto);
    }
  };
}

