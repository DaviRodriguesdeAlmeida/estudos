export function criarSalaCard(sala) {
  const artigo = document.createElement("article");
  artigo.className = "sala-card";
  artigo.dataset.salaId = sala.id;
  artigo.dataset.visibilidade = sala.visibilidade;
  artigo.dataset.nome = sala.nome;

  const informacoes = document.createElement("div");
  const nome = document.createElement("h2");
  const visibilidade = document.createElement("p");
  const entrar = document.createElement("button");

  nome.textContent = sala.nome;
  visibilidade.textContent = sala.visibilidade === "privada" ? "Sala privada" : "Sala pública";
  entrar.type = "button";
  entrar.className = "botao botao-principal";
  entrar.dataset.entrarSala = "true";
  entrar.textContent = "Entrar";

  informacoes.append(nome, visibilidade);
  artigo.append(informacoes, entrar);
  return artigo;
}

