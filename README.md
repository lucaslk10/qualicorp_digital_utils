# Qualicorp Digital (funções úteis)

###### exemplo de uso:
```js
const { setupEnvironment, responseStructs, AppError, AuthError, middlewares, validations, conversions } = require("@qualicorp_digital/utils");
```
## setupEnviroment
setupEnviroment é uma função comumente usada na inicialização das APIs para atribuir as variáveis de ambiente de acordo com o arquivo .env correspondente ao ambiente da execução.
Recomendável realizar a chamada da função setupEnviroment() antes do import das rotas.
O parâmetro esperado é uma string contendo o path da pasta onde se encontram o(s) arquivo(s) de extensão env. <br>
Caso não seja passado nada será utilizado como padrão o diretório raiz do projeto.

###### exemplo de uso:
```js
const express = require("express");
const app = express();
const { setupEnviroment } = require("@qualicorp_digital/utils");
setupEnviroment("./config");
```

## responseStructs
Um objeto que detém funções que padronizam as responses das APIs, são elas:

###### Formato da função:
```js
responseSuccess(res, data, status = 200) {
  //res: é o objeto response do express.<br>
  //data: é o resultado da API, sendo geralmente um objeto ou um array.<br>
  //status: statusCode da response. Se não for atribuído assumirá 200 (sucesso).<br>
}
```

###### Formato da função:
```js
responseError(res, error, status = 500) {
  //res: é o objeto response do express.<br>
  //error: é o objeto de erro externado pelo trow. Geralmente será uma string com o erro ou um objeto //contendo a propriedade message.<br>
  //status: statusCode da response. Se não for atribuído assumirá 500 (erro interno).<br>
}
```

###### Formato da função:
```js
getErrorMessage(error) {
  //error: é o objeto de erro obtido pelo try-catch. A função irá avaliar o objeto e retornará a mensagem da melhor forma para o client requisitante.
}
```

###### Exemplo de uso das 3 funções acima:
```js
app.get("/", (req, res) => {
  try {
    const dados = { message: "hello world" };
    responseSuccess(res, dados)
  } catch (error) {
    const msg = getErrorMessage(error);
    responseError(res, msg);
  }  
});
```

## AppError
Ao importa-lo você recebe uma instância da classe AppError. Utilizado para lançar exceções intencionais da aplicação, diferenciando-as das exceções inexperadas.

###### Formato do objeto:
```js
{
  message; // string
  statusCode; // number default: 400
}
```

## AuthError
Ao importa-lo você recebe uma instância da classe AuthError. Utilizado para lançar exceções ocasionadas durante a autenticação.

###### Formato do objeto:
```js
{
  message; // string
  statusCode; // number default: 401
}
```

## middlewares
Um objeto que contém middlewares padrões no formato do express.

###### middlewares disponíveis:

###### Formato da função:
```js
const handle404 = function (req, res, next) {
  // req: request
  // res: response
  // next: proxima função da stack
  res.status("404").json({ status: 404, message: "URL não encontrada." });
  next();
};
```

###### Formato da função:
```js
const handleError = async (error, req, res, _) => {

}
```

###### Formato da função:
```js
const validateAuth = function (req, res, next) {
  // req: request
  // res: response
  // next: proxima função da stack
  // Realiza a chamada da validação do JWT. Para isso é feito uma chamada http na API de acesso.
};

###### Exemplo de uso:
```js
const { middlewares } = require("@qualicorp_digital/utils");
const express = require("express");
const app = express();
app.use(routes);
app.use(middlewares.handle404); // deve sempre estar após as rotas
```

## validations
Contém diversos objetos que possuem funções para diversos gêneros de validações:<br>

**1. dateValidations**
- isValidBRFormat(data) 
- isValidUAFormat(data) 
- isValidRange(dataInicio, dataFim)

**2. documentsValidations**<br>
**2.1 cpfValidations**
- unformat(cpf)
- isValid(unformatedCpf)

**3. emailValidations**
- isValid(value)

**4. numberValidations**
- isNatural(value)

**5. passwordValidations**
- isValid(value)

**6. stringValidations**
- onlyLetters(value)
- onlyNumbers(value)

## conversions
Contém diversos objetos que possuem funções para diversos gêneros de conversões:<br>

**1. date**
- formatBrasil(data)
- formatEUA(value)
- formatEUAdateTime(value)
- formatTimestamp(value)
- getDiffBetweenDates(initialDate, finalDate)
- clear(data, separator = "/")
- reverse(data, separator = "/")
- clearAndReverse(data, separator = "/")
- getAge(birthDate, referenceDate)

**2. inputs**<br>
**2.1 query**
- parse(value)

**3. hashs**
**3.1 base64**
- decode(base64Value)
- encode(value);

**4. number**
- round(decimalValue, places = 2)
- trunc(decimalValue, places = 2)

**5. string**
- getOnlyNumbers(str)
