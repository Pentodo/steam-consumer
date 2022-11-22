# Steam REST API

Uma aplicação desenvolvida para o suporte em futuras disciplinas da `UNIFEI`.\
Com ela, será possível a criação de novos projetos que utilizarão os dados consumidos da loja Steam.

## Configurando

### `.env`

Um arquivo contendo as variáveis de ambiente deve ser criado na raíz do projeto.\
E como é utilizado o `PostgreSQL`, é necessário configurar sua conexão:

```
DATABASE_URL="postgres://{user}:{password}@{hostname}:{port}/{database-name}?schema={schema-name}"
```

Troque os campos com as chaves pelo o que deseja. Obs: as chaves não fazem parte da `connection string`!

## Inicializando

### 1. Clone o repositório e instale as dependências

Para baixar esta aplicação, use o comando:

```
git clone git@github.com:Pentodo/steam-consumer.git
```

Depois, instale as dependências:

```
cd steam-consumer
npm install
```

### 2. Crie e preencha o Banco de Dados

Use o comando abaixo para criar nosso banco no `PostgreSQL`:

```
npx prisma migrate dev --name init
```

Com isso, ele criará as entidades e seus relacionamentos — além de executar o arquivo [`prisma/seed.ts`](./prisma/seed.ts).
Este arquivo realizará requisições HTTP à loja da Steam, preenchendo nosso banco de dados.

### 3. Inicie o servidor REST API

```
npm start
```

Agora, nosso servidor está rodando em `http://localhost:3000`. 
Você pode fazer requisições à API, por exemplo: [`http://localhost:3000/apps`](http://localhost:3000/apps).
