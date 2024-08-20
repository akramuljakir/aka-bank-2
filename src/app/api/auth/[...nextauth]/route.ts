import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma'; // Ensure the prisma instance is correct
import NextAuth from 'next-auth';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null; // Return null if credentials are missing
                }

                // Find the user from the database
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                // Check if user exists and password matches
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return {
                        id: String(user.id), // Convert id to string
                        role: user.role,
                        email: user.email,
                    };
                }

                // If authentication fails, return null
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: { id: string; role: string; email: string } }) {
            // If a user is available, add role and email to the token
            if (user) {
                token.role = user.role as "ADMIN" | "EMPLOYEE" | "CUSTOMER";
                token.email = user.email;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            // Assign the role and id from token to session
            session.user.role = token.role as "ADMIN" | "EMPLOYEE" | "CUSTOMER";
            session.user.id = token.id as string;
            return session;
        },
    },
    pages: {
        signIn: '/login', // Redirect to login page if authentication is required
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
