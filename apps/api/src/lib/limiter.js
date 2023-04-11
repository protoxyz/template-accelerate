import rateLimit from "express-rate-limit";
import { isProduction } from "./environment.js";

export function createApiLimiter(props) {
  const defaultWindowMs = isProduction ? 3 * 60 * 1000 : 3 * 60 * 1000 * 1000; // 3 mins
  const defaultMax = isProduction ? 100 : 10000; // 100 requests per 3 mins

  return rateLimit({
    windowMs: props?.windowMs ?? defaultWindowMs, // 3 minutes
    max: props?.max ?? defaultMax, // Limit each IP to 100 requests per `window` (here, per 3 minutes)
    standardHeaders: props?.standardHeaders ?? true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: props?.legacyHeaders ?? false, // Disable the `X-RateLimit-*` headers
  });
}
