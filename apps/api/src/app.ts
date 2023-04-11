require("module-alias/register");

import express, { Express } from "express";

import * as trpcExpress from "@trpc/server/adapters/express";
import {
  generateOpenApiDocument,
  createOpenApiExpressMiddleware,
} from "trpc-openapi";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import appRouter from "./routers/_app";
import { createContext } from "./lib/trpc";

export type AppRouter = typeof appRouter;
import { createApiLimiter } from "./lib/limiter";

async function main() {
  const app: Express = express();
  const port = process.env.PORT || 4000;

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use(
    "/trpc",

    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use(
    "/api",
    createApiLimiter(),
    express.json(),
    cors({
      origin: true,
      credentials: true,
    }),
    createOpenApiExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Set up Swagger documentation
  const openApiOptions = {
    title: "Protocol Starter Kit API",
    description: "REST API for Protocol Starter Kit",
    version: "1.0.0",
    baseUrl: `http://localhost:${port}/api`,
  };

  const openApiDocument = generateOpenApiDocument(appRouter, openApiOptions);

  // if (process.env.SERVE_SWAGGER) {
  app.use("/docs", swaggerUi.serve, (...args: any) =>
    //@ts-ignore
    swaggerUi.setup(openApiDocument)(...args)
  );
  app.use("/openapi.json", (req, res) => res.json(openApiDocument));
  // }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

void main();
