export const env = {
  //@ts-expect-error
  API_URL: process.env.REACT_APP_API_URL ?? "http://localhost:8081",
  //@ts-expect-error
  ...(window.wingEnv ?? {}),
};
