import { iniciarLogin } from "../pages/login.js";
import { iniciarCadastro } from "../pages/cadastro.js";
import { iniciarInicio } from "../pages/inicio.js";
import { iniciarJogo } from "../pages/jogo.js";

const cabecalho = { caminho: "/html/components/header.html", seletor: "#cabecalho" };
const modalSair = { caminho: "/html/components/modal-sair.html", seletor: "#modal-sair" };

export const paginas = {
  login: {
    html: "/html/pages/login.html",
    css: ["/css/components/auth.css", "/css/pages/login.css"],
    iniciar: iniciarLogin
  },
  cadastro: {
    html: "/html/pages/cadastro.html",
    css: ["/css/components/auth.css", "/css/pages/cadastro.css"],
    iniciar: iniciarCadastro
  },
  inicio: {
    html: "/html/pages/inicio.html",
    css: [
      "/css/components/header.css",
      "/css/components/modal.css",
      "/css/components/sala.css",
      "/css/pages/inicio.css"
    ],
    componentes: [
      cabecalho,
      modalSair,
      { caminho: "/html/components/modal-criar-sala.html", seletor: "#modal-criar-sala" },
      { caminho: "/html/components/modal-entrar-sala.html", seletor: "#modal-entrar-sala" }
    ],
    iniciar: iniciarInicio
  },
  jogo: {
    html: "/html/pages/jogo.html",
    css: ["/css/components/header.css", "/css/components/modal.css", "/css/pages/jogo.css"],
    componentes: [cabecalho, modalSair],
    iniciar: iniciarJogo
  }
};

