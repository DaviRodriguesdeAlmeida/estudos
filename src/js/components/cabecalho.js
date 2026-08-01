import { buscarUsuario } from "../services/usuarioService.js";
import { obterUsuarioId } from "../state/sessao.js";

export async function iniciarCabecalho() {
  const nome = document.querySelector("#nome-usuario-cabecalho");

  try {
    const usuario = await buscarUsuario(obterUsuarioId());
    nome.textContent = usuario.nome || usuario.email || "Jogador";
    return usuario;
  } catch {
    nome.textContent = "Jogador";
    return null;
  }
}

