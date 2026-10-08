import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import cors from 'cors';

import authRoutes from '../routes/auth.routes.js';
import achievementRoutes from '../routes/achievement.routes.js';
import eventRoutes from '../routes/event.routes.js';
import galleryRoutes from '../routes/gallery.routes.js';
import themeRoutes from '../routes/theme.routes.js';
import memberRoutes from '../routes/member.routes.js';
import applicationRoutes from '../routes/application.routes.js';
import contactRoutes from '../routes/contact.routes.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/contact', contactRoutes);

describe('VOGUE Backend REST API Integration Suite', () => {
  let adminToken = '';

  // 1. Authentication
  describe('POST /api/auth/login', () => {
    it('returns 401 on invalid admin credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'invalid_user', password: 'wrong_password' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('authenticates seed admin and returns JWT session token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'vogue_admin', password: 'VogueSOA@2026!Master' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.user.username).toBe('vogue_admin');
      adminToken = res.body.data.token;
    });
  });

  // 2. Public Achievements API
  describe('GET /api/achievements', () => {
    it('returns list of verified club awards', async () => {
      const res = await request(app).get('/api/achievements');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(10);
    });

    it('filters achievements by year parameter', async () => {
      const res = await request(app).get('/api/achievements?year=2025');

      expect(res.status).toBe(200);
      expect(res.body.data.every((a: any) => a.year === 2025)).toBe(true);
    });
  });

  // 3. Signature Themes API
  describe('GET /api/themes', () => {
    it('returns all 4 signature themes (Anantara, Evolution, Raj Ghrana, Indo-Western)', async () => {
      const res = await request(app).get('/api/themes');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(4);
      const names = res.body.data.map((t: any) => t.name);
      expect(names).toContain('Anantara');
      expect(names).toContain('Raj Ghrana');
      expect(names).toContain('Indo-Western');
    });
  });

  // 4. Audition Applications Submission & Validation
  describe('POST /api/applications', () => {
    it('rejects incomplete payload with 422 Unprocessable Entity', async () => {
      const res = await request(app)
        .post('/api/applications')
        .send({ fullName: 'Priya' }); // missing required fields

      expect(res.status).toBe(422);
      expect(res.body.success).toBe(false);
    });

    it('successfully accepts valid audition registration', async () => {
      const randomReg = `2341${Math.floor(100000 + Math.random() * 900000)}`;
      const res = await request(app)
        .post('/api/applications')
        .send({
          fullName: 'Test Model Candidate',
          regNumber: randomReg,
          email: `candidate_${Date.now()}@soa.ac.in`,
          phone: '9876543210',
          branchYear: 'B.Tech CSE - 2nd Year, ITER',
          category: 'RUNWAY_MODEL',
          auditionSlot: 'Slot A: Saturday 2:00 PM - ITER Main Auditorium',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();
    });
  });

  // 5. Admin CSV Roster Export Protection & Format
  describe('GET /api/applications/export/csv', () => {
    it('blocks unauthenticated requests with 401', async () => {
      const res = await request(app).get('/api/applications/export/csv');
      expect(res.status).toBe(401);
    });

    it('exports CSV with proper header when authenticated with Bearer or query token', async () => {
      const res = await request(app)
        .get(`/api/applications/export/csv?token=${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('text/csv');
      expect(res.text).toContain('Registration Number');
    });
  });
});
