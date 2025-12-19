export const auth = {
  secret: process.env.BETTER_AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? 'dev-secret',
  baseURL: process.env.BETTER_AUTH_URL ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000',
  providers: [],
};

export default auth;
