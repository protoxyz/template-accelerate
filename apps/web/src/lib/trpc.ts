import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../../api/src/app";
import { createTRPCNext } from "@trpc/next";
import { NextPageContext } from "next";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_API_URL)
    // reference for protocol stacks
    return `https://${process.env.NEXT_PUBLIC_API_URL}/trpc`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 4000}/trpc`;
}

export interface SSRContext extends NextPageContext {
  /**
   * Set HTTP Status code
   * @usage
   * const utils = trpc.useContext();
   * if (utils.ssrContext) {
   *   utils.ssrContext.status = 404;
   * }
   */
  status?: number;
}

export const trpc = createTRPCNext<AppRouter, SSRContext>({
  config({ ctx }) {
    return {
      transformer: superjson,
      queryClientConfig: {},
      links: [
        httpBatchLink({
          url: getBaseUrl(),
          headers() {
            if (!ctx?.req?.headers) {
              return {};
            }
            // To use SSR properly, you need to forward the client's headers to the server
            // This is so you can pass through things like cookies when we're server-side rendering
            const {
              // If you're using Node 18 before 18.15.0, omit the "connection" header
              connection: _connection,
              ...headers
            } = ctx.req.headers;
            return headers;
          },
          async fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
              headers: {
                ...options?.headers,
              },
            });
          },
        }),
      ],
    };
  },
  ssr: false,
});

export type Inputs = inferRouterInputs<AppRouter>;
export type Outputs = inferRouterOutputs<AppRouter>;
