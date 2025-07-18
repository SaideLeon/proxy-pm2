const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const TARGET_PORT = process.env.TARGET_PORT || 3030;
const TARGET_HOST = process.env.TARGET_HOST || "host.docker.internal";

const app = express();

app.use(
  "/",
  createProxyMiddleware({
    target: `http://${TARGET_HOST}:${TARGET_PORT}`,
    changeOrigin: true,
    ws: true,
    onError(err, req, res) {
      res.writeHead(502);
      res.end("Erro ao conectar ao app PM2");
    },
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌐 Proxy ouvindo em http://localhost:${PORT} >> redirecionando para http://${TARGET_HOST}:${TARGET_PORT}`);
});
