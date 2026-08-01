import Navigo from "navigo";
import { paginas } from "./paginas.js";
import { renderizarPagina } from "./gerenciadorPagina.js";
import { validarToken } from "../services/authService.js";
import { limparSessao, estaAutenticado } from "../state/sessao.js";

const router = new Navigo("/");

function navegar(caminho) {
  router.navigate(caminho);
}

function contexto() {
  return {
    navegar,
    atualizarLinks: () => router.updatePageLinks()
  };
}

async function abrirPublica(pagina) {
  if (estaAutenticado()) {
    navegar("/inicio");
    return;
  }

  await renderizarPagina(pagina, contexto());
}

async function abrirProtegida(pagina) {
  if (!estaAutenticado()) {
    navegar("/login");
    return;
  }

  try {
    await validarToken();
  } catch {
    limparSessao();
    navegar("/login");
    return;
  }

  await renderizarPagina(pagina, contexto());
}

router
  .on("/login", () => abrirPublica(paginas.login))
  .on("/cadastro", () => abrirPublica(paginas.cadastro))
  .on("/inicio", () => abrirProtegida(paginas.inicio))
  .on("/jogo", () => abrirProtegida(paginas.jogo))
  .on("/", () => navegar(estaAutenticado() ? "/inicio" : "/login"))
  .notFound(() => navegar(estaAutenticado() ? "/inicio" : "/login"));

export default router;

