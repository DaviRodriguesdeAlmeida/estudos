import axios from "axios";
import { API_URL } from "../app/config.js";
import { obterToken } from "../state/sessao.js";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((configuracao) => {
  const token = obterToken();
  if (token) configuracao.headers.Authorization = `Bearer ${token}`;
  return configuracao;
});

export default api;

