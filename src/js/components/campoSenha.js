export function iniciarCamposSenha(eventos) {
  document.querySelectorAll("[data-alternar-senha]").forEach((botao) => {
    eventos.ouvir(botao, "click", () => {
      const campo = document.querySelector(`#${botao.dataset.alternarSenha}`);
      const mostrando = campo.type === "text";
      campo.type = mostrando ? "password" : "text";
      botao.textContent = mostrando ? "Mostrar" : "Ocultar";
    });
  });
}

