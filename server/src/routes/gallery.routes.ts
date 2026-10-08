import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { prisma } from '../config/prisma.js';
import { ENV } from '../config/env.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { z } from 'zod';

const router = Router();

const galleryItemSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  category: z.enum(['RUNWAY', 'EDITORIAL', 'BTS', 'WORKSHOP']).default('RUNWAY'),
  themeId: z.string().optional().nullable(),
  imageUrl: z.string().min(1, 'Image URL is required'),
  videoUrl: z.string().optional().nullable(),
  isVideo: z.boolean().default(false),
  aspectRatio: z.string().default('3:4'),
  isFeatured: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
});

// GET /api/gallery (Public)
router.get('/', async (req, res, next) => {
  try {
    const { category, themeId, featured } = req.query;

    const where: any = {};
    if (category && category !== 'ALL') {
      where.category = category as string;
    }
    if (themeId) {
      where.themeId = themeId as string;
    }
    if (featured === 'true') {
      where.isFeatured = true;
    }

    const items = await prisma.galleryItem.findMany({
      where,
      include: {
        theme: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return sendSuccess(res, items, 'Gallery items retrieved successfully');
  } catch (err) {
    next(err);
  }
});

// POST /api/gallery/upload (Admin - File Upload)
router.post('/upload', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return sendError(res, 'No image file uploaded', 400);
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  return sendSuccess(res, { imageUrl: fileUrl, filename: req.file.filename }, 'File uploaded successfully', 201);
});

// POST /api/gallery (Admin - Create Gallery Record)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const parsed = galleryItemSchema.parse(req.body);
    const created = await prisma.galleryItem.create({
      data: {
        title: parsed.title,
        category: parsed.category,
        themeId: parsed.themeId || null,
        imageUrl: parsed.imageUrl,
        videoUrl: parsed.videoUrl || null,
        isVideo: parsed.isVideo || false,
        aspectRatio: parsed.aspectRatio,
        isFeatured: parsed.isFeatured,
        displayOrder: parsed.displayOrder,
      },
      include: {
        theme: true,
      },
    });

    return sendSuccess(res, created, 'Gallery item created successfully', 201);
  } catch (err) {
    next(err);
  }
});

// PUT /api/gallery/:id (Admin)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const parsed = galleryItemSchema.partial().parse(req.body);
    const updated = await prisma.galleryItem.update({
      where: { id },
      data: parsed,
    });
    return sendSuccess(res, updated, 'Gallery item updated successfully');
  } catch (err) {
    next(err);
  }
});

// DELETE /api/gallery/:id (Admin)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.galleryItem.findUnique({ where: { id } });

    if (existing && existing.imageUrl.startsWith('/uploads/')) {
      const filename = path.basename(existing.imageUrl);
      const filePath = path.join(ENV.UPLOAD_DIR, filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Could not unlink local file:', filePath, e);
        }
      }
    }

    await prisma.galleryItem.delete({ where: { id } });
    return sendSuccess(res, null, 'Gallery item and local file deleted successfully');
  } catch (err) {
    next(err);
  }
});

export default router;
