import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser } from './lib/actions/user.action';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const user = await getUser(credentials)
        if (!user) return null;

        if (credentials.email === user.email && user.comparePassword(credentials.password)) {
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login'
  },
  trustHost: true,
  trustedHosts: ['localhost', 'localhost:3000', 'tirze-fit.com'],
  secret: process.env.NEXTAUTH_SECRET
});