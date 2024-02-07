import express from "express";

const server = express();

export default app;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  server.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
  });
});
