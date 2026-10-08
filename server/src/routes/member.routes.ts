import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { sendSuccess } from '../utils/response.js';
import { requireAuth } from '../middleware/auth.js';
import { z } from 'zod';

const router = Router();

const memberSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  roleTitle: z.string().min(2, 'Role title is required'),
  category: z.enum(['FOUNDER', 'FACULTY', 'LEAD_MODEL', 'CORE']),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  displayOrder: z.number().int().default(0),
});

// GET /api/members (Public)
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const where: any = {};
    if (category) {
      where.category = category as string;
    }

    const members = await prisma.member.findMany({
      where,
      orderBy: { displayOrder: 'asc' },
    });

    return sendSuccess(res, members, 'Team members retrieved successfully');
  } catch (err) {
    next(err);
  }
});

// POST /api/members (Admin)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const parsed = memberSchema.parse(req.body);
    const created = await prisma.member.create({ data: parsed });
    return sendSuccess(res, created, 'Member created successfully', 201);
  } catch (err) {
    next(err);
  }
});

// PUT /api/members/:id (Admin)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const parsed = memberSchema.partial().parse(req.body);
    const updated = await prisma.member.update({
      where: { id },
      data: parsed,
    });
    return sendSuccess(res, updated, 'Member updated successfully');
  } catch (err) {
    next(err);
  }
});

// DELETE /api/members/:id (Admin)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.member.delete({ where: { id } });
    return sendSuccess(res, null, 'Member deleted successfully');
  } catch (err) {
    next(err);
  }
});

export default router;
