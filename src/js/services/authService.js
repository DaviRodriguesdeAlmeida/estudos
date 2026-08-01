import api from "./api.js";

export async function login(dados) {
  const resposta = await api.post("/usuarios/login", dados);
  return resposta.data.dados;
}

export async function cadastrar(dados) {
  const resposta = await api.post("/usuarios/cadastro", dados);
  return resposta.data;
}

export async function validarToken() {
  const resposta = await api.get("/usuarios/validar-token");
  return resposta.data;
}

