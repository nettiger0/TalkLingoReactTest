const { createProxyMiddleware } = require("http-proxy-middleware");


module.exports = function (SignUp) {
  SignUp.use(
    "/user",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};