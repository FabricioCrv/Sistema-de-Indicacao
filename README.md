# Sistema de Indicação

## Sobre o Projeto

Este é um sistema de indicação simples, onde usuários podem se cadastrar, fazer login, visualizar seu perfil, copiar seu link de indicação e indicar novos usuários. Quando um novo usuário se cadastra usando um link de indicação, o usuário que indicou ganha 1 ponto. Esse projeto faz parte do desáfio técnico da **Vortex Unifor**.

## Funcionalidades

### Cadastro de Usuário
- Usuário informa o nome, e-mail, senha e, se desejar, o código de indicação copiado de outro usuário.
- Apenas senhas de 8 digitos contendo letras e números são aceitas.
- Não pode haver mais de um email cadastrado no banco de dados.

### Pagina de Perfil 
- Exibe nome, pontuação do usuário e link de indicação único dele. Com um botão para copiar o link de indicação.

### Login
- Usuário informa e-mail e senha, depois é diretamente redirecionado para a pagina de perfil.

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

```
CREATE TABLE Users (
	id INT auto_increment primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    score INT default 0,
    referralCode varchar(255) unique,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Configure as variáveis de ambiente

No diretório `server`, crie um arquivo chamado `.env` com o seguinte conteúdo (ajuste conforme seu ambiente):

```
PORT=3000
DATABASE_URL=mysql://{seu_root}:{sua_senha}@localhost:3306/{seu_schema}
SECRET_JWT=seu_secret
```
Faça o mesmo no diretório `client` para definição da porta, pois o front e o back não podem rodar na mesma porta

```
PORT=3002
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


## Colaboração com IA

Este projeto foi feito com auxílio da **IA Copilot** dentro do VScode, foi usada para tirar certas dúvidas do projeto, principalmente para partes envolvendo front end, como também para auxíliar na criação de código repetitivo.

---

## Aprendizado

Aplicando todos os conhecimentos adiquiridos com projetos passados e usando a IA para as partes menos conhecidas do projeto ajudou a **entender o funcionamento de uma aplicação fullstack**, vendo como cada parte do projeto colabora para garantir a **arquitetura do projeto** 
e a como a **lógica do negócio** pode ser aplicada dependendo da situação, e como fazer uso efficiente de frameworks para a criação de aplicações tanto front end como back end.

