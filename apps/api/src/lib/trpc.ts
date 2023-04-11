import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { OpenApiMeta } from "trpc-openapi";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export type Context = {
  userId: string | null;
  user: any;
};

export const createContext = async (opts: CreateExpressContextOptions) => {
  const { req } = opts;

  return {
    userId: null,
    user: null,
  };
};

export const t = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
      if (shape.data.code !== "UNAUTHORIZED") {
        console.log("***** ERROR ******");
        console.log(error);
        console.log(shape);
      }

      return {
        ...shape,
        data: {
          ...shape.data,
          zod:
            error.cause instanceof ZodError
              ? error.cause.flatten().fieldErrors
              : null,
        },
      };
    },
  });

export const middleware = t.middleware;
export const router = t.router;
export const procedure = t.procedure;

export type CreateRouter = typeof router;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next }: any) => {
  if (!ctx || !ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Must be logged in!",
    });
  }

  return next({
    ctx,
  });
});

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
