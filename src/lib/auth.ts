import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number; // seconds
}

interface CustomToken {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  error?: string;
}

interface CustomUser {
  id: string;
  email?: string | null;
  name?: string | null;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
}

interface CustomSession {
  accessToken?: string;
  error?: string;
}

async function refreshAccessToken(token: CustomToken) {
  try {
    if (!token.refreshToken) return token; // nothing to do

    // Development mode: Mock token refresh
    if (
      process.env.NODE_ENV === "development" &&
      !process.env.BACKEND_API_URL
    ) {
      console.log("Development mode: Mock token refresh");
      const now = Math.floor(Date.now() / 1000);
      return {
        ...token,
        accessToken: "dev-refreshed-access-token",
        refreshToken: token.refreshToken, // Keep the same refresh token
        accessTokenExpires: now + 3600 // 1 hour from now
      };
    }

    if (!process.env.BACKEND_API_URL) {
      console.error("BACKEND_API_URL environment variable is not set");
      return { ...token, error: "ConfigurationError" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `Token refresh failed with status ${res.status}:`,
        errorText
      );
      throw new Error("Refresh failed");
    }

    const data: RefreshResponse = await res.json();
    const now = Math.floor(Date.now() / 1000);
    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken || token.refreshToken,
      accessTokenExpires: now + data.expiresIn - 5 // small safety window
    };
  } catch (error) {
    console.error("Token refresh error:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.error("Missing credentials");
          return null;
        }

        // Development mode: Mock authentication
        if (
          process.env.NODE_ENV === "development" &&
          !process.env.BACKEND_API_URL
        ) {
          console.log("Development mode: Using mock authentication");

          // Simple mock authentication for development
          if (
            credentials.email === "admin@example.com" &&
            credentials.password === "password"
          ) {
            return {
              id: "dev-user-1",
              email: "admin@example.com",
              name: "Development User",
              accessToken: "dev-access-token",
              refreshToken: "dev-refresh-token",
              accessTokenExpires: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
            };
          }

          console.error("Invalid credentials in development mode");
          return null;
        }

        if (!process.env.BACKEND_API_URL) {
          console.error("BACKEND_API_URL environment variable is not set");
          return null;
        }

        try {
          const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });

          if (!res.ok) {
            const errorText = await res.text();
            console.error(`Login failed with status ${res.status}:`, errorText);
            return null;
          }

          const data = await res.json();
          if (!data?.user) {
            console.error("Login response missing user data:", data);
            return null;
          }

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            accessToken: data.token?.accessToken || data.token,
            refreshToken: data.token?.refreshToken,
            accessTokenExpires: data.token?.expiresIn
              ? Math.floor(Date.now() / 1000) + data.token.expiresIn
              : undefined
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        const customUser = user as CustomUser;
        token.accessToken = customUser.accessToken;
        token.refreshToken = customUser.refreshToken;
        token.accessTokenExpires = customUser.accessTokenExpires;
        return token;
      }
      const now = Math.floor(Date.now() / 1000);
      const customToken = token as CustomToken;
      const accessTokenExpires = customToken.accessTokenExpires;
      if (accessTokenExpires && now < accessTokenExpires) {
        return token; // still valid
      }
      const refreshedToken = await refreshAccessToken(token as CustomToken);
      return {
        ...token,
        ...refreshedToken
      };
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      const customToken = token as CustomToken;
      customSession.accessToken = customToken.accessToken;
      customSession.error = customToken.error;
      return session;
    }
  }
});
