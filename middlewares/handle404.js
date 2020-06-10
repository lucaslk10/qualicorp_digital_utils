exports.handle404 = async function (req, res, next) {
  res.status("404").json({ status: 404, message: "URL não encontrada." });
  next();
}