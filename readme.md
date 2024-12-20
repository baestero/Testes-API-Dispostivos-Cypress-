# Testes Automatizados com Cypress - API de Dispositivos

Este projeto contém testes automatizados realizados com o framework Cypress para validar o funcionamento de uma API RESTful de gerenciamento de dispositivos. Os testes cobrem operações básicas como listar, buscar, cadastrar, alterar e deletar dispositivos.

## Pré-requisitos

Antes de executar os testes, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/en/) (você pode verificar a versão do Node com o comando `node -v`).
- [Cypress](https://www.cypress.io/) (Instalado via `npm install cypress`).
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) para gerenciar dependências.

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

2. Instale as dependências:

```bash
npm install
```

3. Abra o Cypress:

```bash
npx cypress open
```

Ou execute os testes diretamente no terminal:

```bash
npx cypress run
```

## Estrutura de Testes

### Testes Definidos

1. **Listar todos dispositivos**:
   - Valida a resposta da API ao listar todos os dispositivos.
   - Verifica se os dispositivos retornados têm os atributos esperados (id, nome, preço, etc.).
   - Verifica se o tempo de resposta da requisição é inferior a 1 segundo.
   - Garante que não há dispositivos com IDs duplicados.

2. **Buscar dispositivo específico**:
   - Verifica a busca de um dispositivo com um ID específico (`/objects/7`).
   - Valida o status e os atributos do dispositivo retornado.

3. **Buscar dispositivo inexistente**:
   - Tenta buscar um dispositivo com um ID inexistente (`/objects/12345678`).
   - Verifica que o código de status retornado é `404` e a mensagem de erro é apropriada.

4. **Cadastrar, consultar, alterar e deletar dispositivo**:
   - Realiza as seguintes ações para um dispositivo:
     1. **Cadastrar** um novo dispositivo via `POST`.
     2. **Consultar** o dispositivo cadastrado via `GET`.
     3. **Alterar** o nome do dispositivo via `PUT`.
     4. **Deletar** o dispositivo via `DELETE`.
     5. **Verificar** que o dispositivo foi realmente deletado, tentando consultá-lo novamente com `GET` e esperando o status `404`.

## Configuração da API

Os testes são realizados contra a seguinte API pública: [https://api.restful-api.dev/objects](https://api.restful-api.dev/objects)

A API permite realizar operações CRUD (Create, Read, Update, Delete) sobre dispositivos, com os seguintes endpoints principais:

- `POST /objects`: Cadastrar um novo dispositivo.
- `GET /objects`: Listar todos os dispositivos.
- `GET /objects/{id}`: Buscar um dispositivo específico.
- `PUT /objects/{id}`: Alterar um dispositivo.
- `DELETE /objects/{id}`: Deletar um dispositivo.

## Como Contribuir

Se você encontrar algum problema ou quiser adicionar melhorias, fique à vontade para abrir uma issue ou um pull request.

1. Faça um fork deste repositório.
2. Crie uma branch para sua modificação (`git checkout -b minha-modificacao`).
3. Faça o commit das suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`).
4. Envie para o repositório remoto (`git push origin minha-modificacao`).
5. Abra um Pull Request para que possamos revisar.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

---

