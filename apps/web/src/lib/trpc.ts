import React from "react";
import { httpBatchLink } from "@trpc/client";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";
import { useState } from "react";
import { createTRPCReact } from "@trpc/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppRouter } from "../../../api/src/app";

export function getBaseUrl() {
  if (process.env.API_URL)
    // reference for protocol stacks
    return `https://${process.env.API_URL}/trpc`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 4000}/trpc`;
}

export const trpc = createTRPCReact<AppRouter>({
  unstable_overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn();
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});

// export const trpc = createTRPCNext<AppRouter>({
//   config({ ctx }) {
//     return {
//       transformer: superjson,
//       queryClientConfig: {},
//       links: [
//         httpBatchLink({
//           url: `${getBaseUrl()}/trpc`,
//           async fetch(url, options) {
//             return fetch(url, {
//               ...options,
//               credentials: "include",
//               headers: {
//                 ...options?.headers,
//               },
//             });
//           },
//         }),
//       ],
//     };
//   },
//   ssr: false,
// });

export type Inputs = inferRouterInputs<AppRouter>;
export type Outputs = inferRouterOutputs<AppRouter>;
