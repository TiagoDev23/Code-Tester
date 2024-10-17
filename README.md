# Code Tester

Code Tester é uma plataforma web desenvolvida para facilitar o aprendizado de Testes de Software, utilizando elementos de gamificação. Esta plataforma permite que os usuários criem, enviem e resolvam problemas de programação, aplicando técnicas de teste de software em um ambiente prático e interativo.

## Pré-requisitos

Antes de começar, você precisará ter os seguintes softwares instalados:

- **Node.js** (versão 14.x ou superior)
- **MongoDB** (versão 4.x ou superior)
- **Git** (opcional, mas recomendado para clonar o repositório)

### 1. Instalar o Node.js

Você pode baixar e instalar o Node.js [aqui](https://nodejs.org/). Siga as instruções para seu sistema operacional.

### 2. Instalar o MongoDB

Siga as instruções para instalar o MongoDB [aqui](https://www.mongodb.com/try/download/community). Após a instalação, execute o MongoDB localmente em sua máquina (a porta padrão é `27017`).

## Instalação

### 1. Clonando o repositório

Clone o repositório do Code Tester para sua máquina:

```bash
git clone https://github.com/seu-usuario/code-tester.git
```

### 2. Instalar dependências

Dentro do diretório do projeto, execute o seguinte comando para instalar as dependências necessárias:

```bash
cd code-tester
npm install
```

Isso instalará todas as dependências listadas no arquivo `package.json`, como Express.js, Mongoose, CodeMirror, etc.

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```env
# Conexão com o MongoDB
MONGODB_URI=mongodb://localhost:27017/code-tester

# JWT Secret para autenticação
JWT_SECRET=sua-chave-secreta

# Porta onde a aplicação rodará
PORT=3000
```

### 4. Iniciando o servidor

Depois de instalar as dependências e configurar o MongoDB, você pode iniciar o servidor com o seguinte comando:

```bash
npm start
```

O servidor será executado no endereço `http://localhost:3000`.

### 5. Inicializar o MongoDB (opcional)

Se desejar popular o banco de dados com dados iniciais ou configurá-lo para produção, você pode executar scripts específicos. Consulte a documentação do MongoDB para mais detalhes sobre inicialização de coleções.

## Uso

1. Abra o navegador e acesse `http://localhost:3000`.
2. Crie uma conta ou faça login com um usuário existente.
3. Navegue até a página de desafios e crie, edite ou resolva desafios.
4. Receba feedback instantâneo sobre as submissões.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento do back-end.
- **Express.js**: Framework de desenvolvimento para a API.
- **MongoDB**: Banco de dados NoSQL para persistência de dados.
- **CodeMirror**: Editor de código interativo no front-end.
- **JWT (JSON Web Tokens)**: Utilizado para autenticação e controle de sessões.

## Funcionalidades

- Criação e resolução de desafios de código.
- Feedback imediato para submissões.
- Sistema de pontuação e ranking.
- Autenticação de usuários via JWT.

## Futuras Melhorias

- Integração com mais tipos de testes de software.
- Melhorias na interface do usuário.
- API pública para integração com outras plataformas.

## Licença

Este projeto está sob a licença MIT. Para mais detalhes, veja o arquivo LICENSE.
```

Esse `README.md` inclui todas as etapas necessárias para instalar, configurar e rodar o **Code Tester**, além de informações sobre como contribuir e possíveis melhorias.
