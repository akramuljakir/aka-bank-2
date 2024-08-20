import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            role: 'ADMIN' | 'EMPLOYEE' | 'CUSTOMER';
        } & DefaultSession['user'];
    }

    interface User {
        id: string;
        email: string;
        role: 'ADMIN' | 'EMPLOYEE' | 'CUSTOMER';
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        email: string;
        role: 'ADMIN' | 'EMPLOYEE' | 'CUSTOMER';
    }
}
