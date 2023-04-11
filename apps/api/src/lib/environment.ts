export const isProduction =
  process.env.NODE_ENV === "production" || !!process.env.PROTOCOL_ENV;

export const environment = process.env.NODE_ENV;
