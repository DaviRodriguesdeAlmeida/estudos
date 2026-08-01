async function buscarHtml(caminho) {
  const resposta = await fetch(caminho);

  if (!resposta.ok) {
    throw new Error(`Não foi possível carregar ${caminho}.`);
  }

  return resposta.text();
}

export async function carregarPagina(caminho) {
  const app = document.querySelector("#app");
  app.innerHTML = await buscarHtml(caminho);
}

export async function carregarComponentes(componentes = []) {
  await Promise.all(componentes.map(async ({ caminho, seletor }) => {
    const elemento = document.querySelector(seletor);
    if (elemento) elemento.innerHTML = await buscarHtml(caminho);
  }));
}

