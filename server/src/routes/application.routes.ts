import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { applicationSchema } from '../utils/validation.js';
import { requireAuth } from '../middleware/auth.js';
import { publicFormRateLimiter } from '../middleware/rateLimiter.js';
import { Parser } from 'json2csv';
import { z } from 'zod';

const router = Router();

// POST /api/applications (Public - Submit Application)
router.post('/', publicFormRateLimiter, async (req, res, next) => {
  try {
    const parsed = applicationSchema.parse(req.body);

    // Check duplicate active registration with same registration number or email
    const existing = await prisma.application.findFirst({
      where: {
        OR: [
          { regNumber: parsed.regNumber },
          { email: parsed.email },
        ],
      },
    });

    if (existing) {
      return sendError(
        res,
        'An application with this registration number or email is already on file.',
        409,
        null,
        'DUPLICATE_APPLICATION'
      );
    }

    const created = await prisma.application.create({
      data: parsed,
    });

    return sendSuccess(
      res,
      {
        id: created.id,
        fullName: created.fullName,
        category: created.category,
        auditionSlot: created.auditionSlot,
      },
      'Application submitted successfully! Our runway coordinators will contact you.',
      201
    );
  } catch (err) {
    next(err);
  }
});

// GET /api/applications (Admin - List Applicants)
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { category, status, slot } = req.query;

    const where: any = {};
    if (category) {
      where.category = category as string;
    }
    if (status) {
      where.status = status as string;
    }
    if (slot) {
      where.auditionSlot = slot as string;
    }

    const applications = await prisma.application.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return sendSuccess(res, applications, 'Applications retrieved successfully');
  } catch (err) {
    next(err);
  }
});

// GET /api/applications/export (Admin - Export to CSV)
router.get('/export/csv', requireAuth, async (_req, res, next) => {
  try {
    const rawApplications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Prevent CSV Formula Injection (CWE-1236)
    const sanitizeCsvField = (value: any) => {
      if (typeof value !== 'string') return value;
      const dangerousChars = ['=', '+', '-', '@', '\t', '\r'];
      if (dangerousChars.some((char) => value.startsWith(char))) {
        return `'${value}`;
      }
      return value;
    };

    const sanitizedApplications = rawApplications.map((app) => ({
      ...app,
      fullName: sanitizeCsvField(app.fullName),
      regNumber: sanitizeCsvField(app.regNumber),
      email: sanitizeCsvField(app.email),
      phone: sanitizeCsvField(app.phone),
      branchYear: sanitizeCsvField(app.branchYear),
      category: sanitizeCsvField(app.category),
      heightFeet: sanitizeCsvField(app.heightFeet),
      instagramHandle: sanitizeCsvField(app.instagramHandle),
      portfolioUrl: sanitizeCsvField(app.portfolioUrl),
      auditionSlot: sanitizeCsvField(app.auditionSlot),
      status: sanitizeCsvField(app.status),
      notes: sanitizeCsvField(app.notes),
    }));

    const fields = [
      { label: 'ID', value: 'id' },
      { label: 'Full Name', value: 'fullName' },
      { label: 'Registration Number', value: 'regNumber' },
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'Branch & Year', value: 'branchYear' },
      { label: 'Role Category', value: 'category' },
      { label: 'Height (ft)', value: 'heightFeet' },
      { label: 'Instagram', value: 'instagramHandle' },
      { label: 'Portfolio URL', value: 'portfolioUrl' },
      { label: 'Audition Slot', value: 'auditionSlot' },
      { label: 'Status', value: 'status' },
      { label: 'Notes', value: 'notes' },
      { label: 'Submitted At', value: 'createdAt' },
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(sanitizedApplications);

    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.attachment(`vogue_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    return res.send(csv);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/applications/:id/status (Admin - Update Status)
const updateStatusSchema = z.object({
  status: z.enum(['PENDING', 'SHORTLISTED', 'REJECTED']),
  notes: z.string().optional(),
});

router.patch('/:id/status', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = updateStatusSchema.parse(req.body);

    const updated = await prisma.application.update({
      where: { id },
      data: {
        status,
        ...(notes !== undefined ? { notes } : {}),
      },
    });

    return sendSuccess(res, updated, `Applicant status updated to ${status}`);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/applications/:id (Admin)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.application.delete({ where: { id } });
    return sendSuccess(res, null, 'Application record removed');
  } catch (err) {
    next(err);
  }
});

export default router;
