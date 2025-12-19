export const auth = {
  baseURL: process.env.BETTER_AUTH_URL ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? 'dev-secret',
  providers: [],
};

export default auth;
