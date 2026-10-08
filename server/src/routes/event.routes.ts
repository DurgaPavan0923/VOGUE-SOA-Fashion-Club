import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { sendSuccess } from '../utils/response.js';
import { eventSchema } from '../utils/validation.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/events (Public)
router.get('/', async (req, res, next) => {
  try {
    const { status, category } = req.query;

    const where: any = {};
    if (status) {
      where.status = status as string;
    }
    if (category) {
      where.category = category as string;
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: [
        { eventDate: 'asc' },
        { displayOrder: 'asc' },
      ],
    });

    return sendSuccess(res, events, 'Events retrieved successfully');
  } catch (err) {
    next(err);
  }
});

// POST /api/events (Admin)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const parsed = eventSchema.parse(req.body);
    const eventDate = new Date(parsed.eventDate);
    const created = await prisma.event.create({
      data: {
        ...parsed,
        eventDate,
      },
    });
    return sendSuccess(res, created, 'Event created successfully', 201);
  } catch (err) {
    next(err);
  }
});

// PUT /api/events/:id (Admin)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const parsed = eventSchema.partial().parse(req.body);
    const updateData: any = { ...parsed };
    if (parsed.eventDate) {
      updateData.eventDate = new Date(parsed.eventDate);
    }
    const updated = await prisma.event.update({
      where: { id },
      data: updateData,
    });
    return sendSuccess(res, updated, 'Event updated successfully');
  } catch (err) {
    next(err);
  }
});

// DELETE /api/events/:id (Admin)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({ where: { id } });
    return sendSuccess(res, null, 'Event deleted successfully');
  } catch (err) {
    next(err);
  }
});

export default router;
