import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { achievementSchema } from '../utils/validation.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/achievements (Public)
router.get('/', async (req, res, next) => {
  try {
    const { year, highlight } = req.query;

    const where: any = {};
    if (year) {
      where.year = parseInt(year as string, 10);
    }
    if (highlight === 'true') {
      where.isHighlight = true;
    }

    const achievements = await prisma.achievement.findMany({
      where,
      orderBy: [
        { year: 'desc' },
        { displayOrder: 'asc' },
      ],
    });

    return sendSuccess(res, achievements, 'Achievements retrieved successfully');
  } catch (err) {
    next(err);
  }
});

// POST /api/achievements (Admin)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const data = achievementSchema.parse(req.body);
    const created = await prisma.achievement.create({ data });
    return sendSuccess(res, created, 'Achievement added successfully', 201);
  } catch (err) {
    next(err);
  }
});

// PUT /api/achievements/:id (Admin)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = achievementSchema.partial().parse(req.body);
    const updated = await prisma.achievement.update({
      where: { id },
      data,
    });
    return sendSuccess(res, updated, 'Achievement updated successfully');
  } catch (err) {
    next(err);
  }
});

// DELETE /api/achievements/:id (Admin)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.achievement.delete({ where: { id } });
    return sendSuccess(res, null, 'Achievement deleted successfully');
  } catch (err) {
    next(err);
  }
});

export default router;
