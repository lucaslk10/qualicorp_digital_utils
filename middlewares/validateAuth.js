const AuthError = require("../exceptions/AuthError");
const AppError = require("../exceptions/AppError");
const axios = require("axios");

exports.validateAuth = async function (req, res, next) {
  let { auth } = req.headers;

  if (!process.env.URL_TOKEN_VALIDAR) {
    throw new AppError("Variável de ambiente 'URL_TOKEN_VALIDAR' não foi encontrada.");
  }

  if (!auth) {
    if (process.env.NODE_ENV !== undefined || process.env.NODE_ENV !== 'dev') {
      next();
      return;
    } else {
      throw new AuthError("'auth' não foi preenchido.");
    }
  }

  let response = undefined;
  try {
    response = await axios.post(`${process.env.URL_TOKEN_VALIDAR}`, {}, { headers: { "auth": auth, "Content-Type": "application/json" } });
  } catch (error) {
    if (error.response &&
      error.response.data &&
      ((error.response.data.message.toLowerCase() == "authorization has been denied for this request.") ||
        (error.response.data.message.toLowerCase() == "recusado"))) {
      throw new AuthError("'auth' inválido ou vencido.");
    }
    throw error;
  }

  if (response.data) {
    req.user = response.data.data;
    next();
  } else {
    throw new AppError("Retorno inexperado durante validateAuth")
  }
}