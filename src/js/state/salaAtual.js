const CHAVE_SALA = "sala_atual";

export function salvarSalaAtual(sala) {
  sessionStorage.setItem(CHAVE_SALA, JSON.stringify(sala));
}

export function obterSalaAtual() {
  const sala = sessionStorage.getItem(CHAVE_SALA);

  try {
    return sala ? JSON.parse(sala) : null;
  } catch {
    limparSalaAtual();
    return null;
  }
}

export function limparSalaAtual() {
  sessionStorage.removeItem(CHAVE_SALA);
}

