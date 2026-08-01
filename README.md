# Front-end do Jogo da Velha

Uma reorganização completa do front-end do projeto de jogo da velha, usando as mesmas ferramentas principais do projeto original: JavaScript simples, Vite, Navigo, Axios e Socket.IO Client.

## Executar

O backend precisa estar disponível em `http://localhost:3000`.

```bash
npm install
npm run dev
```

Para usar outro endereço, copie `.env.example` para `.env` e altere `VITE_API_URL`.

## Estrutura

```text
public/
  html/
    pages/          HTML próprio de cada página
    components/     HTML reutilizado em páginas diferentes
  css/
    pages/          CSS exclusivo de uma página
    components/     CSS de elementos reutilizáveis
src/js/
  app/              Inicialização, rotas e ciclo de vida das páginas
  pages/            Coordenação de cada tela
  components/       Comportamentos reutilizáveis da interface
  services/         Comunicação HTTP e Socket.IO
  state/            Dados persistidos no navegador
  utils/            Funções genéricas, sem regra do jogo
```

## Como as responsabilidades foram divididas

- `utils` só contém mecanismos genéricos: carregar HTML/CSS, mostrar erros e registrar/remover eventos.
- `services` é a única camada que conhece URLs, Axios e a criação do socket.
- `state` centraliza `localStorage` e `sessionStorage`.
- `components` controla partes reutilizáveis, como cabeçalho e modais.
- `pages` conecta os componentes aos serviços e decide o que acontece na tela.
- `app` controla as rotas e sempre limpa a página anterior antes de iniciar a próxima.

O arquivo `utils/eventos.js` é a parte mais importante para evitar eventos duplicados. Todo `addEventListener` e todo `socket.on` feito por uma página é registrado nele. Ao trocar de rota, a função `limpar()` remove esses listeners.

O modal de entrada em sala privada possui apenas um evento de `submit`. A sala selecionada fica em uma variável interna do componente; clicar em salas diferentes não cria novos listeners.

## Contratos esperados do backend

O front usa as rotas HTTP:

- `POST /usuarios/login`
- `POST /usuarios/cadastro`
- `GET /usuarios/validar-token`
- `GET /usuarios/:id`

E os eventos Socket.IO já presentes no projeto original:

- `criar_sala`
- `entrar_sala`
- `receber_sala`
- `receber_oponente`
- `mensagem`

A interface da partida está pronta, mas movimentos, início, desistência e saída definitiva da sala dependem dos respectivos eventos no backend. O botão de sair emite `sair_sala` e volta ao início; se esse evento ainda não existir, o backend apenas o ignorará.

