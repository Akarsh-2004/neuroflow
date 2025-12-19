import { betterAuth } from "better-auth";

// Read important env vars (provide helpful fallback suggestions)
const secret = process.env.BETTER_AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
const baseURL = process.env.BETTER_AUTH_URL ?? process.env.NEXTAUTH_URL;

if (!secret) {
  // Warn in development to help with setup; avoid throwing so CI or production builds don't break
  console.warn(
    '[better-auth] WARNING: BETTER_AUTH_SECRET (or NEXTAUTH_SECRET) is not set. Sessions will be insecure.'
  );
}

/**
 * Initialize better-auth with minimal config.
 * Database adapter will be configured once Prisma client is properly initialized.
 * 
 * TODO: Integrate prismaAdapter(prisma, { provider: "postgresql" }) once Prisma v6 compatibility is resolved.
 */
export const auth = betterAuth({
  secret,
  baseURL,
  // Example: add providers here (uncomment and configure)
  // providers: [
  //   { id: 'github', clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET },
  // ],
});

export default auth;
