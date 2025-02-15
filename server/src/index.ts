import express from "express";
import log4js, { Configuration } from "log4js";
import cors from "cors";
import connectDatabase from "./config/db";
import log4jsConfig from "./config/log4js.config";
import { logRequests } from "./middlewares/requestLogger";
import { globalLimiterMiddleware } from "./middlewares/rateLimiter";
import { routes } from "./routes/index";
log4js.configure(log4jsConfig as Configuration);
import * as dotenv from "dotenv";
const app = express();
dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT;

app.use(logRequests);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

// Apply rate limiter middleware
app.use(globalLimiterMiddleware);

// Use your router for the routes
routes(app);

// Set up the logger
const logger = log4js.getLogger();

// Connect to the database and start the server
connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    logger.error("Error connecting to the database", error);
    process.exit(1); // Exit the process if the database connection fails
  });
