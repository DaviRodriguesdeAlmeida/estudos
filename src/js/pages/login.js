import { login } from "../services/authService.js";
import { salvarSessao } from "../state/sessao.js";
import { iniciarCamposSenha } from "../components/campoSenha.js";
import { criarGerenciadorEventos } from "../utils/eventos.js";
import { mostrarMensagem, obterMensagemErro } from "../utils/erros.js";

export function iniciarLogin({ navegar }) {
  const eventos = criarGerenciadorEventos();
  const form = document.querySelector("#form-login");
  const mensagem = document.querySelector("#mensagem-login");
  const botao = form.querySelector("button[type='submit']");

  iniciarCamposSenha(eventos);

  eventos.ouvir(form, "submit", async (evento) => {
    evento.preventDefault();
    botao.disabled = true;
    mostrarMensagem(mensagem, "Entrando...", true);

    try {
      const dados = Object.fromEntries(new FormData(form));
      const sessao = await login(dados);
      salvarSessao(sessao);
      navegar("/inicio");
    } catch (error) {
      mostrarMensagem(mensagem, obterMensagemErro(error, "E-mail ou senha inválidos."));
    } finally {
      botao.disabled = false;
    }
  });

  return eventos.limpar;
}

