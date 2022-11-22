# steam-consumer

Uma aplicação desenvolvida para suporte em futuras disciplinas da `UNIFEI`.\
Com ela, será possível a criação de novos projetos que utilizarão os dados consumidos da loja Steam.

## Configuração

### `.env`

Um arquivo contendo as variáveis de ambiente deve ser criado na raíz do projeto.\
E como é utilizado o `PostgreSQL`, é necessário configurar sua conexão:

```
DATABASE_URL="postgres://{user}:{password}@{hostname}:{port}/{database-name}?schema={schema-name}"
```

Troque os campos com as chaves pelo o que deseja. Obs: as chaves não fazem parte da `connection string`!
