# Sistema de Indicação

## Sobre o Projeto

Este é um sistema de indicação simples, onde usuários podem se cadastrar, fazer login, visualizar seu perfil, copiar seu link de indicação e indicar novos usuários. Quando um novo usuário se cadastra usando um link de indicação, o usuário que indicou ganha 1 ponto.

### Funcionalidades

- **Cadastro de Usuário:** Nome, e-mail, senha e (opcional) código de indicação.
- **Validação:** E-mail válido e senha com pelo menos 8 caracteres, incluindo letras e números.
- **Login:** Autenticação via JWT.
- **Perfil:** Exibe nome, pontuação e link de indicação único. Botão para copiar o link.
- **Lógica de Indicação:** Ao cadastrar com um link de indicação, o usuário que indicou ganha 1 ponto.
- **Atualização e exclusão de usuário:** Possível via API.
- **Responsividade:** Interface responsiva, feita com CSS puro (sem frameworks).

---
### Tecnologias Usadas
- Back end - **NodeJS**: Por questão de familiaridade com a linguagem Javascript após usa-la em vários projetos da faculdade, inclusive um atualmente na cadeira de projeto aplicado em Web.
  
- Front end - **React**: Tive contato com o framework em alguns projetos, e ele é bem intuitívo para muitos projetos web.
  
- Banco de dados - **MySQL**: Simples e fácil usar, tenho bastante familiaridade com banco de dados relacional.

---
## Como executar o projeto localmente

### Pré-requisitos

- Node.js (v16 ou superior)
- MySQL (com o MySQL Workbench)
- NPM


### 1. Clone o repositório

```
git clone https://github.com/FabricioCrv/Sistema-de-Indicacao.git
cd Sistema-de-indicacao
```

### 2. Configure o banco de dados

- Crie um banco de dados MySQL chamado `sistema_indicacao` (ou o nome que preferir).
- Execute o script `server/database/schema.sql` no MySQL Workbench ou terminal para criar as tabelas.

### 3. Configure as variáveis de ambiente

No diretório `server`, crie um arquivo `.env` com o seguinte conteúdo (ajuste conforme seu ambiente):

```
PORT=3000
DATABASE_URL=mysql://root:1234@localhost:3306/sistema_indicacao
JWT_SECRET=seu_secret
```

### 4. Instale as dependências

#### Back-end

```
cd server
npm install
```

#### Front-end

Abra outro terminal:

```
cd client
npm install
```

### 5. Inicie o back-end

No diretório `server`:

```
npm start
```
O back-end rodará em `http://localhost:3000`.

### 6. Inicie o front-end

No diretório `client`:

```
npm start
```
O front-end rodará em `http://localhost:3002` (ou a porta definida no `.env` do client).

---


### Colaboração com IA

Este projeto foi feito com auxílio da IA Copilot dentro do VScode, usei ela em partes do projeto em que tive pouco contato durante meu percuso nos projetos da faculdade, principalmente no desenvolvimento do Front end, assim como também em certas partes do back end para resolução de erros e configuração do banco de dados. Contudo, outras partes consegui desenvolver com o que eu aprendi durante a construção de outros projetos da faculdade, tanto passados e atuais, também fiz certas linhas de código diferente do que a IA sugeriu, por ser melhor para o desempenho e funcionamento da aplicação.
