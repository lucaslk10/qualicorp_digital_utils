const query = {
  parse(queryParameters) {
    let result = {};
    for (param in queryParameters) {
      const propertyName = param.split('.');
      let value = undefined

      try {
        value = JSON.parse(queryParameters[param]);
      } catch {
        value = queryParameters[param]
      }

      if (propertyName.length > 1) {
        result[propertyName[0]] = { [propertyName[1]]: value };
      } else {
        result[propertyName] = value;
      }
    }
    return result;
  }
}

module.exports = {
  query
}