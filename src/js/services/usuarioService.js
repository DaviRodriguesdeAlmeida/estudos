import api from "./api.js";

export async function buscarUsuario(id) {
  const resposta = await api.get(`/usuarios/${id}`);
  return resposta.data.dados || resposta.data;
}

