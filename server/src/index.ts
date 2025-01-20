import express from "express";
import http from "http";
import log4js, { Configuration } from "log4js";
import cors from "cors";
import connectDatabase from "@src/config/db";
import log4jsConfig from "@src/config/log4js.config";
import { logRequests } from "@src/middlewares/requestLogger";
import { globalLimiterMiddleware } from "@src/middlewares/rateLimiter";
import router from "./routes/route";

log4js.configure(log4jsConfig as Configuration);
const app = express();
const PORT = process.env.PORT;

app.use(logRequests);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use(globalLimiterMiddleware);

app.use(router);
const server = http.createServer(app);

const logger = log4js.getLogger();

connectDatabase().then(() => {
  server.listen(PORT, () =>
    logger.log(`Server listening on http://localhost:${PORT}`)
  );
});
