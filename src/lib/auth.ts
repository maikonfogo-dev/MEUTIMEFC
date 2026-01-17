import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/types/auth';
import { db } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key-change-in-prod';

export const auth = {
  hashPassword: async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  },

  comparePassword: async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
  },

  generateToken: (user: User): string => {
    // Get permissions based on role
    const permissions = db.roles.getPermissions(user.role);

    return jwt.sign(
      {
        userId: user.id,
        role: user.role,
        teamId: user.team_id,
        isSocio: user.is_socio,
        permissions: permissions
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  },

  verifyToken: (token: string): any => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
};
