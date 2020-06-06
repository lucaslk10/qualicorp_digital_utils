const base64 = {
  async encode(value) {
    if (typeof value === "object")
      value = JSON.stringify(value);

    const buff = new Buffer(value);
    return buff.toString("base64");
  },

  async decode(base64value) {
    const buff = new Buffer(base64value, "base64");
    return buff.toString("ascii");
  }
};

module.exports = {
  base64
}