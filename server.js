const http = require("http");
const app = require("./backend/app");

const PORT = process.env.PORT || 3000;

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const onError = error => {
  if (error.syscall !== "listen") throw error;

  const addr = http.createServer().address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} required elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

http
  .createServer(app)
  .on("error", onError)
  .listen(normalizePort(PORT), () =>
    console.log(`listening on port ${PORT}...`)
  );
