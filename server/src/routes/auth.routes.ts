import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';
import { ENV } from '../config/env.js';
import { loginSchema } from '../utils/validation.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// POST /api/auth/login
router.post('/login', authRateLimiter, async (req, res, next) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const admin = await prisma.admin.findFirst({
      where: {
        OR: [{ username }, { email: username }],
      },
    });

    if (!admin) {
      return sendError(res, 'Invalid credentials provided', 401, null, 'INVALID_CREDENTIALS');
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return sendError(res, 'Invalid credentials provided', 401, null, 'INVALID_CREDENTIALS');
    }

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return sendSuccess(res, {
      token,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    }, 'Authentication successful');
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me (Verify session)
router.get('/me', requireAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    if (!req.user) {
      return sendError(res, 'Unauthorized', 401);
    }

    const admin = await prisma.admin.findUnique({
      where: { id: req.user.id },
      select: { id: true, username: true, email: true, role: true, createdAt: true },
    });

    if (!admin) {
      return sendError(res, 'User not found', 404);
    }

    return sendSuccess(res, admin, 'Session valid');
  } catch (err) {
    next(err);
  }
});

export default router;
