# steam-consumer

Uma aplicação desenvolvida para suporte em futuras disciplinas da `UNIFEI`.\
Com ela, será possível a criação de novos projetos que utilizarão os dados consumidos da loja Steam.

## Configuração

### `.env`

Um arquivo contendo as variáveis de ambiente deve ser criado na raíz do projeto.\
Como é utilizado o `PostgreSQL` para guardar as informações fornecidas pela Steam, é necessário configurar sua conexão:

```
	$ DATABASE_URL="postgres://{user}:{password}@{hostname}:{port}/{database-name}?schema={schema-name}"
```
