import { getServerSession } from 'next-auth/next';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

export async function requireRole(req, role) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== role) {
        return false; // User is either not logged in or doesn't have the correct role
    }

    return true; // User has the correct role
}
