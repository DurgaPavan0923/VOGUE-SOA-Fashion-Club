import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { sendSuccess } from '../utils/response.js';
import { themeSchema } from '../utils/validation.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/themes (Public)
router.get('/', async (_req, res, next) => {
  try {
    const themes = await prisma.theme.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        galleryItems: {
          take: 4,
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    const parsedThemes = themes.map((t) => ({
      ...t,
      paletteTokens: JSON.parse(t.paletteTokens || '[]'),
    }));

    return sendSuccess(res, parsedThemes, 'Themes retrieved successfully');
  } catch (err) {
    next(err);
  }
});

// GET /api/themes/:slug (Public)
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const theme = await prisma.theme.findUnique({
      where: { slug },
      include: {
        galleryItems: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    if (!theme) {
      return res.status(404).json({ success: false, error: { message: 'Theme not found' } });
    }

    return sendSuccess(res, {
      ...theme,
      paletteTokens: JSON.parse(theme.paletteTokens || '[]'),
    }, 'Theme details retrieved');
  } catch (err) {
    next(err);
  }
});

// PUT /api/themes/:id (Admin)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const parsed = themeSchema.partial().parse(req.body);
    const updated = await prisma.theme.update({
      where: { id },
      data: parsed,
    });
    return sendSuccess(res, updated, 'Theme updated successfully');
  } catch (err) {
    next(err);
  }
});

export default router;
