const CHAVE_TOKEN = "token";
const CHAVE_USUARIO = "usuario_id";

export function salvarSessao({ token, id }) {
  localStorage.setItem(CHAVE_TOKEN, token);
  localStorage.setItem(CHAVE_USUARIO, id);
}

export function obterToken() {
  return localStorage.getItem(CHAVE_TOKEN);
}

export function obterUsuarioId() {
  return localStorage.getItem(CHAVE_USUARIO);
}

export function limparSessao() {
  localStorage.removeItem(CHAVE_TOKEN);
  localStorage.removeItem(CHAVE_USUARIO);
}

export function estaAutenticado() {
  return Boolean(obterToken() && obterUsuarioId());
}

