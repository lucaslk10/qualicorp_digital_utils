exports.cpfValidation = {
  unformat(cpf) {
    return cpf.replace(/\-|\./g, "");
  },
  isValid(unformatedCpf) {
    var Soma;
    var Resto;
    Soma = 0;

    // Elimina CPFs invalidos conhecidos
    if (unformatedCpf == "00000000000" ||
      unformatedCpf == "11111111111" ||
      unformatedCpf == "22222222222" ||
      unformatedCpf == "33333333333" ||
      unformatedCpf == "44444444444" ||
      unformatedCpf == "55555555555" ||
      unformatedCpf == "66666666666" ||
      unformatedCpf == "77777777777" ||
      unformatedCpf == "88888888888" ||
      unformatedCpf == "99999999999") {
      return false;
    }

    for (var i = 1; i <= 9; i++)
      Soma = Soma + parseInt(unformatedCpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))
      Resto = 0;

    if (Resto != parseInt(unformatedCpf.substring(9, 10)))
      return false;

    Soma = 0;
    for (var i = 1; i <= 10; i++)
      Soma = Soma + parseInt(unformatedCpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))
      Resto = 0;
    if (Resto != parseInt(unformatedCpf.substring(10, 11)))
      return false;

    return true;
  }
};