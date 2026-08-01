export function criarGerenciadorEventos() {
  const limpezas = [];

  function ouvir(elemento, evento, funcao, opcoes) {
    if (!elemento) return;

    elemento.addEventListener(evento, funcao, opcoes);
    limpezas.push(() => elemento.removeEventListener(evento, funcao, opcoes));
  }

  function ouvirSocket(socket, evento, funcao) {
    socket.on(evento, funcao);
    limpezas.push(() => socket.off(evento, funcao));
  }

  function adicionarLimpeza(funcao) {
    limpezas.push(funcao);
  }

  function limpar() {
    limpezas.splice(0).reverse().forEach((funcao) => funcao());
  }

  return { ouvir, ouvirSocket, adicionarLimpeza, limpar };
}

