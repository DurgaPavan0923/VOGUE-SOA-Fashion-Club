import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { sendSuccess } from '../utils/response.js';
import { contactMessageSchema } from '../utils/validation.js';
import { requireAuth } from '../middleware/auth.js';
import { publicFormRateLimiter } from '../middleware/rateLimiter.js';
import { z } from 'zod';

const router = Router();

// POST /api/contact (Public - Submit Message)
router.post('/', publicFormRateLimiter, async (req, res, next) => {
  try {
    const parsed = contactMessageSchema.parse(req.body);
    const created = await prisma.contactMessage.create({
      data: parsed,
    });
    return sendSuccess(
      res,
      { id: created.id },
      'Thank you! Your message has been transmitted to VOGUE SOA executive coordinators.',
      201
    );
  } catch (err) {
    next(err);
  }
});

// GET /api/contact (Admin - View Messages)
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { isRead } = req.query;
    const where: any = {};
    if (isRead !== undefined) {
      where.isRead = isRead === 'true';
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return sendSuccess(res, messages, 'Contact messages retrieved successfully');
  } catch (err) {
    next(err);
  }
});

// PATCH /api/contact/:id/read (Admin - Mark Read/Unread)
router.patch('/:id/read', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isRead } = z.object({ isRead: z.boolean() }).parse(req.body);

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });

    return sendSuccess(res, updated, 'Message status updated');
  } catch (err) {
    next(err);
  }
});

// DELETE /api/contact/:id (Admin)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id } });
    return sendSuccess(res, null, 'Message deleted');
  } catch (err) {
    next(err);
  }
});

export default router;
