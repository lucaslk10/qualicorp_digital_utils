# Qualicorp Digital (funções úteis)

###### exemplo de uso:
```js
const { setupEnvironment, responseStructs, AppError, middlewares, validations } = require("@qualicorp_digital/utils");
```
## setupEnviroment
setupEnviroment é uma função comumente usada no ato de inicialização das APIs para atribuir as variáveis de ambiente de acordo com o arquivo .env correspondente ao ambiente da execução.
Recomendável realizar a chamada da função setupEnviroment() antes das rotas.
O parâmetro esperado é uma string com o path da pasta onde se encontram o(s) arquivo(s) de extensão env. Caso não seja passado nada será utilizado como padrão o diretório raiz do projeto.

###### exemplo de uso:
```js
const express = require("express");
const app = express();
const { setupEnviroment } = require("@qualicorp_digital/utils");
setupEnviroment("./config");
```

## responseStructs
Um objeto que detém as funções que padronizam as responses das APIs, são elas:

```js
responseSuccess(res, data, status = 200) {
  //res: é o objeto response do express.<br>
  //data: é o resultado da API, sendo geralmente um objeto ou um array.<br>
  //status: statusCode da response. Se não for atribuído assumirá 200 (sucesso).<br>
}
```

```js
responseError(res, error, status = 500) {
  //res: é o objeto response do express.<br>
  //error: é o objeto de erro externado pelo trow. Geralmente será uma string com o erro ou um objeto //contendo a propriedade message.<br>
  //status: statusCode da response. Se não for atribuído assumirá 500 (erro interno).<br>
}
```

```js
getErrorMessage(error) {
  //error: é o objeto de erro obtido pelo try-catch. A função irá avaliar o objeto e retornará a mensagem da melhor forma para o client requisitante.
}
```

## AppError
Ao importa-lo você recebe uma instância da classe AppError. Utilizado para lançar exceções intencionais da aplicação, diferenciando-as das exceções inexperadas.

###### Seu formato é:
```js
{
  message; // string
  statusCode; // number default: 400
}
```

## middlewares
Um objeto que contém middlewares padrões no formato esperado pelo express.

###### middlewares disponíveis:
```js
const handle404 = function (req, res, next) {
  // req: request
  // res: response
  // next: proxima função da stack
  res.status("404").json({ status: 404, message: "URL não encontrada." });
  next();
};
```
## validations
Contém diversos objetos que contém funções para diversos tipos de validações:
1. dateValidations
- isValidFormat(data) 
- isValidRange(dataInicio, dataFim)
- castToYYYYMMDD(data)

2. documentsValidations
- cpfValidations
* unformat(cpf)
* isValid(unformatedCpf)

3. emailValidations
- isValid(value)

4. numberValidations
- isNatural(value)

5. passwordValidations
- isValid(value)

6. stringValidations
- onlyLetters(value)
- onlyNumbers(value)
