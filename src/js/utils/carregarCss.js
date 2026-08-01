export function carregarCss(arquivos = []) {
  document.querySelectorAll("link[data-css-pagina]").forEach((link) => link.remove());

  arquivos.forEach((arquivo) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = arquivo;
    link.dataset.cssPagina = "true";
    document.head.appendChild(link);
  });
}

