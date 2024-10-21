import NextAuth from "next-auth";
import prisma from '../../../../db/db';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    throw new Error("User account does not exist.");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid email or password.");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            }
        }),

         // Google provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // Facebook provider
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        })
    ],
    session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30,  // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            // If a user object is passed during signIn, attach it to the token
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token; // <-- Important: Return the token object
        },
        async session({ session, token }) {
            session.user.token = token; // Attach the JWT token to the session object
            return session;
        }
    }
});

export { handler as GET, handler as POST };
