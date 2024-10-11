//** NextAuth Integration with Google and Facebook Providers:**

// app/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { openDb } from '../../api/utility/database';
import bcrypt from 'bcrypt';
import { getUserByEmailQuery } from '../../api/queries/userQueries';
import { ERROR_MESSAGES } from '../../api/constants/errorMessages';
import { handleError } from '../../api/utility/errorHandler';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const db = await openDb();
          const user = await db.get(getUserByEmailQuery, credentials.email);

          if (user && (await bcrypt.compare(credentials.password, user.password))) {
            return { id: user.id, name: user.email, role: user.role };
          } else {
            throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
          }
        } catch (error) {
          handleError(error, ERROR_MESSAGES.FAILED_AUTHORIZE_USER);
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    }
  }
});