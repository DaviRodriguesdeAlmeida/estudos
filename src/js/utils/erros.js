export function obterMensagemErro(error, padrao = "Não foi possível concluir a operação.") {
  return error?.response?.data?.mensagem
    || error?.response?.data?.message
    || error?.message
    || padrao;
}

export function mostrarMensagem(elemento, mensagem = "", sucesso = false) {
  if (!elemento) return;

  elemento.textContent = mensagem;
  elemento.classList.toggle("sucesso", Boolean(mensagem && sucesso));
  elemento.classList.toggle("erro", Boolean(mensagem && !sucesso));
}

