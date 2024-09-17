# Code Tester

Code Tester é uma **Plataforma de Desafios de Programação** que permite que os usuários criem, respondam e gerenciem desafios de programação. A plataforma oferece uma interface para que os usuários submetam soluções para os desafios e acompanhem suas pontuações.

## Funcionalidades

### Usuários
- **Login e Registro**: Os usuários podem criar contas e realizar login no sistema.
- **Autenticação JWT**: O sistema utiliza JSON Web Tokens (JWT) para autenticação e autorização dos usuários.
  
### Desafios
- **Criação de Desafios**: Usuários autenticados podem criar novos desafios de programação, especificando título, descrição, código quebrado, solução e dificuldade.
- **Listagem de Desafios**: Usuários podem visualizar e escolher desafios que ainda não resolveram.
- **Resolução de Desafios**: Usuários podem submeter soluções de código para os desafios selecionados, receber feedback se a solução está correta ou incorreta, e ganhar pontos baseados na dificuldade do desafio.

### Pontuação
- **Sistema de Pontuação**: Os usuários ganham pontos ao resolverem desafios corretamente, com a pontuação variando de acordo com a dificuldade do desafio.
- **Ranking**: Os usuários podem ver seu progresso com base nos pontos acumulados.

### Feedback e Experiência do Usuário
- **Feedback Imediato**: Após submeter uma solução, o usuário recebe uma notificação indicando se a solução está correta ou incorreta.
- **Modal de Feedback**: O feedback é mostrado em uma caixa modal, com opções para tentar novamente ou resolver outro desafio.
- **Desafio Resolvido**: Desafios resolvidos não aparecem mais para o usuário que já os completou.
- **Sistema de Erro**: Em caso de erro de submissão ou outros problemas, o usuário é informado com uma mensagem clara e a opção de tentar novamente.

## Tecnologias Utilizadas

- **Backend**: Node.js com Express.js
- **Autenticação**: JWT (JSON Web Tokens)
- **Banco de Dados**: MongoDB (Mongoose para ORM)
- **Frontend**: HTML, CSS (Bootstrap) e JavaScript
- **Editor de Código**: CodeMirror para uma experiência de edição de código rica e interativa

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```
   
2. Navegue até a pasta do projeto:
   ```bash
   cd nome-do-repositorio
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente. Crie um arquivo `.env` com as seguintes variáveis:
   ```bash
   PORT=3000
   MONGO_URI=seu_mongodb_uri
   JWT_SECRET=seu_segredo_jwt
   ```

5. Inicie o servidor:
   ```bash
   npm start
   ```

6. Acesse o sistema em [http://localhost:3000](http://localhost:3000).

## Rotas Principais

### Autenticação

- **POST /auth/register**: Registrar um novo usuário.
- **POST /auth/login**: Realizar login de um usuário.

### Desafios

- **GET /api/challenges**: Listar todos os desafios.
- **POST /api/challenges/create**: Criar um novo desafio (usuário autenticado).
- **POST /api/challenges/submit**: Submeter a solução de um desafio (usuário autenticado).
- **GET /api/challenges/available**: Listar desafios que o usuário ainda não resolveu (usuário autenticado).

### Submissões

- **POST /api/submissions/submit**: Submeter solução para um desafio (usuário autenticado).
- **GET /api/submissions/available**: Listar desafios que o usuário não resolveu (usuário autenticado).

## Autor

**Tiago Amaro Nunes**

## Licença

Este projeto é licenciado sob os termos da licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Esse README agora inclui o nome do autor **Tiago Amaro Nunes** e continua com as informações detalhadas sobre o projeto e suas funcionalidades.
