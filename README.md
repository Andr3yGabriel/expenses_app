# 💸 Controle de Gastos Residenciais

Sistema web para controle de gastos residenciais, permitindo o cadastro de pessoas, categorias e transações financeiras, com consultas de totais por pessoa e por categoria.

---

## 🗂 Estrutura do Repositório

```text
expenses_app/
├── expenses_api/           # Back-end: API REST em .NET 10
│   ├── Controllers/
│   ├── DTOs/
│   ├── Infrastructure/
│   ├── Migrations/
│   ├── Models/
│   ├── Services/
│   ├── Dockerfile
│   └── compose.yaml        # movido para a raiz
├── expenses-app-front/     # Front-end: React + TypeScript
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── types/
│   └── Dockerfile
| 
├── .env                    # Preencher .example com as chaves corretas
├── .gitignore
└── compose.yaml            # Orquestra API + Banco de dados
```

---

## 🚀 Tecnologias

### Back-end

| Tecnologia | Versão | Função |
| --- | --- | --- |
| C# / .NET | 10 | Framework principal da API |
| Entity Framework Core | 9 | ORM para acesso ao banco de dados |
| PostgreSQL | 16 | Banco de dados relacional |
| Docker | — | Containerização da API e do banco |

### Front-end

| Tecnologia | Versão | Função |
| --- | --- | --- |
| React | 19 | Biblioteca de UI |
| TypeScript | 5.8+ | Tipagem estática |
| Vite | 6 | Bundler e servidor de desenvolvimento |
| MUI (Material UI) | 7 | Biblioteca de componentes visuais |
| TanStack Query | 5 | Gerenciamento de estado e cache de requisições |
| Recharts | 2 | Gráficos interativos |
| React Hook Form | 7 | Gerenciamento de formulários |
| Tailwind CSS | 4 | Estilização utilitária |

---

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose
- [Node.js 22 LTS](https://nodejs.org/) (recomendado via [nvm](https://github.com/nvm-sh/nvm))
- [Git](https://git-scm.com/)

---

## 🔧 Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/Andr3yGabriel/expenses_app
cd expenses_app
```

### 2. Configure as variáveis de ambiente

Remova o .example do arquivo `.env.example` na raiz do projeto e preencha com as credenciais do banco de dados:

```env
DB_NAME=expenses
DB_USER=postgres
DB_PASSWORD=postgres
```

### 3. Suba a API e o banco de dados via Docker

```bash
docker compose up -d
```

Esse comando irá:

- Criar e iniciar o container do **PostgreSQL** na porta `5434`
- Criar e iniciar o container da **API** na porta `8080`
- Executar automaticamente as **migrations** do banco de dados
- Popular o banco com as **categorias iniciais** via seed

Verifique se os containers estão rodando:

```bash
docker compose ps
```

A API estará disponível em: `http://localhost:8080`  
A documentação Swagger estará em: `http://localhost:8080/swagger`

### 4. Instale as dependências do front-end

```bash
cd expenses-app-front
npm install
```

### 5. Inicie o servidor de desenvolvimento do front-end

```bash
npm run dev
```

O front-end estará disponível em: `http://localhost:5173`

---

## ✨ Funcionalidades

### 👤 Cadastro de Pessoas

- **Listar** todas as pessoas cadastradas
- **Criar** uma nova pessoa informando nome e idade
- **Editar** nome e idade de uma pessoa existente
- **Deletar** uma pessoa — todas as suas transações são removidas automaticamente em cascata

> A tabela exibe um indicador visual de maioridade, relevante para a regra de transações.

### 🏷️ Cadastro de Categorias

- **Listar** todas as categorias cadastradas
- **Criar** uma nova categoria com descrição e finalidade (`Despesa`, `Receita` ou `Ambos`)

> As categorias são pré-populadas automaticamente na primeira execução via seed.

### 💳 Cadastro de Transações

- **Listar** todas as transações cadastradas
- **Criar** uma nova transação vinculada a uma pessoa e a uma categoria

**Regras de negócio aplicadas:**

- Pessoas **menores de 18 anos** só podem registrar transações do tipo `Despesa`
- A **categoria** selecionada deve ser compatível com o tipo da transação:
  - Transação `Despesa` → categoria `Despesa` ou `Ambos`
  - Transação `Receita` → categoria `Receita` ou `Ambos`
- O **valor** da transação deve ser estritamente positivo

> O formulário de criação antecipa essas regras: desabilita a opção `Receita` para menores de idade e filtra as categorias disponíveis conforme o tipo selecionado. No entanto, os testes foram realizados por meio do Swagger para confirmar a funcionalidade das regras de negócio.

### 📊 Consulta de Totais por Pessoa

- Lista todas as pessoas com o **total de receitas**, **total de despesas** e **saldo** (receita − despesa) de cada uma
- Exibe o **total geral** consolidado ao final da listagem
- Permite alternar entre visualização em **tabela** e **gráfico de setores** (donut chart)

### 📊 Consulta de Totais por Categoria *(opcional implementado)*

- Lista apenas as categorias com ao menos uma movimentação
- Exibe **receitas**, **despesas** e **saldo** por categoria, respeitando a finalidade de cada uma:
  - Categorias `Despesa` não exibem coluna de receita
  - Categorias `Receita` não exibem coluna de despesa
  - Categorias `Ambos` exibem ambas as colunas
- Exibe o **total geral** ao final da listagem
- Permite alternar entre **tabela** e **gráfico de setores**

### 🔍 Filtros e Ordenação nas Tabelas

Todas as tabelas de listagem possuem:

- **Barra de busca** com filtro em tempo real por qualquer campo textual ou numérico
- **Ordenação por coluna** com três estados: crescente → decrescente → ordem original
- **Contador de resultados** exibindo quantos itens estão visíveis após o filtro

### 🌙 Tema Claro / Escuro

- Alternância entre modo claro e escuro via botão na barra superior
- Preferência **persistida no `localStorage`** — mantida após fechar e reabrir o navegador

---

## 🗃️ Seed de Categorias

Na primeira execução, o sistema popula automaticamente o banco com as seguintes categorias:

| Categoria | Finalidade |
| --- | --- |
| Alimentação | Despesa |
| Moradia | Despesa |
| Transporte | Despesa |
| Saúde | Despesa |
| Educação | Despesa |
| Lazer e Entretenimento | Despesa |
| Vestuário | Despesa |
| Salário | Receita |
| Freelance | Receita |
| Rendimento de Investimentos | Receita |
| Aluguel Recebido | Receita |
| Décimo Terceiro | Receita |
| Transferência entre contas | Ambos |
| Ajuste de saldo | Ambos |

---

## 📡 Endpoints da API

### Pessoas

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/persons` | Lista todas as pessoas |
| `GET` | `/api/persons/{id}` | Retorna uma pessoa pelo ID |
| `GET` | `/api/persons/totals` | Retorna totais de receitas e despesas por pessoa |
| `POST` | `/api/persons` | Cria uma nova pessoa |
| `PUT` | `/api/persons/{id}` | Atualiza uma pessoa existente |
| `DELETE` | `/api/persons/{id}` | Remove uma pessoa e suas transações |

### Categorias

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/categories` | Lista todas as categorias |
| `GET` | `/api/categories/totals` | Retorna totais de receitas e despesas por categoria |
| `POST` | `/api/categories` | Cria uma nova categoria |

### Transações

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/transactions` | Lista todas as transações |
| `POST` | `/api/transactions` | Cria uma nova transação |

> A documentação interativa completa está disponível via Swagger em `http://localhost:8080/swagger`

---

## 🐳 Comandos Docker úteis

```bash
# Subir os containers em background
docker compose up -d

# Subir e forçar rebuild das imagens
docker compose up --build -d

# Ver status dos containers
docker compose ps

# Ver logs da API em tempo real
docker compose logs -f expenses_api

# Parar os containers sem remover os dados
docker compose stop

# Parar e remover containers (os dados do banco são preservados no volume)
docker compose down

# Parar, remover containers E apagar os dados do banco
docker compose down -v
```

---

## 🔄 Migrations

As migrations são aplicadas **automaticamente** ao iniciar a API. Caso precise gerenciá-las manualmente durante o desenvolvimento:

```bash
# Dentro da pasta expenses_api
cd expenses_api

# Criar uma nova migration
dotnet ef migrations add NomeDaMigration

# Aplicar migrations pendentes manualmente
dotnet ef database update

# Reverter para uma migration específica
dotnet ef database update NomeDaMigration
```

O Entity Framework está configurado com `dotnet ef` via a ferramenta `dotnet-ef`. Instale com:

```bash
dotnet tool install --global dotnet-ef
```
