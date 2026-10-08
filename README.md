# VOGUE – SOA Fashion Club | Official Platform

> **"More Than Fashion. A Movement."**  
> *Creativity · Confidence · Couture*  
> Official Haute Couture & Runway Society of Siksha 'O' Anusandhan (SOA) University, Bhubaneswar.

---

### **Website crafted by GDGoC ITER**

---

## ✦ System Overview & Architecture
This repository contains the complete, local-first full-stack web application and executive administration portal for **VOGUE – SOA Fashion Club**.

* **Client:** React 18 + Vite + Tailwind CSS + Framer Motion (Luxury Editorial Fashion Magazine Aesthetics, Indian Cultural Motifs, Custom Cursor, Responsive Lightbox)
* **Server:** Node.js + Express + TypeScript + Multer + Zod + Argon2 + Helmet + Rate-Limiter
* **Persistence:** SQLite with Prisma ORM (`vogue_master.db`)
* **Admin Portal:** JWT Authentication with HTTP-Only session flows, Audition review, CSV roster export, and Content CRUD.

---

## ✦ Quick Start & Local Hosting

### Prerequisites
* **Node.js:** `v20.x` or higher (tested on Node v24.x)
* **npm:** `v10.x` or higher

---

### 1. One-Command Automated Setup
From the repository root directory, run:

```bash
# Install root, server, and client dependencies, initialize SQLite schema, and seed all verified club records
npm run setup
```

---

### 2. Launch Local Development Servers (Concurrent)
```bash
# Starts Express API Server on :5000 and Vite Client on :5173
npm run dev
```

* **Public Web Platform:** [http://localhost:5173](http://localhost:5173)
* **Executive Admin Console:** [http://localhost:5173/admin](http://localhost:5173/admin)
* **Backend REST API:** [http://localhost:5000/api](http://localhost:5000/api)
* **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

### 3. Production Build & Single-Port Local Serving
To build the optimized client bundle and serve everything (UI + REST API + Media) from Express on a single port (`5000`):

```bash
# Build Client & Server
npm run build

# Start Production Server
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

---

## ✦ Default Administrative Credentials
Upon initial seed, the following administrator is created:

* **Portal URL:** `http://localhost:5173/admin/login` (or `http://localhost:5000/admin/login` in production)
* **Username:** `vogue_admin`
* **Email:** `vogue@soa.ac.in`
* **Password:** `VogueSOA@2026!Master`

*(A one-click "Autofill Default Admin Credentials" button is also provided on the login view for rapid evaluation.)*

---

## ✦ Pre-Seeded Club Content (Source of Truth)

### Leadership & Mentorship
* **Faculty Coordinator:** Dr. Mitali Madhusmita Nayak
* **Co-Founder & Creative Director:** Umashankar Biswal
* **Co-Founder & Runway Lead:** Ashutosh Samal

### Signature Thematic Collections
1. **Anantara** (*Timeless Heritage & Haute Couture*)
2. **Evolution Over Royal Fashion** (*Regal Metamorphosis & Contemporary Lineage*)
3. **Raj Ghrana** (*Imperial Aristocracy & Handcrafted Brocades*)
4. **Indo-Western** (*Contemporary Fusion & Asymmetric Drapes*)

### Verified Championship Record
* **Champion** — Spectra Runway 2023 & 2025 (Birla Global University)
* **Winner** — Bramhastra 2024 (Regional College of Management)
* **Runners Up** — Orion Fest 2022 (Sri Sri University)
* **1st Runners Up** — Advita 2024 & 2026 (IIIT Bhubaneswar)
* **Top 5 Finalist** — Miss Abhipsa, Miss Universe 2024 State Track
* **Victorious (Winner)** — Celestia 2025 (Sri Sri University)
* **1st Runners Up** — Chiasma 2025 (AIIMS Bhubaneswar)
* **Runners Up** — Brahmastra 2026 (RCM)
* **1st Runner Up** — IDA Fest (KIIT University)
* **Runners Up** — IGNITE Fest (ASBM University)

---

## ✦ How to Replace Placeholder Visuals with Real Club Photos
All graphics are located in `/client/public/images/` and `/client/public/motifs/`.
1. **Founders / Faculty Portraits:** Replace `faculty-mitali.svg`, `founder-umashankar.svg`, and `founder-ashutosh.svg` with `.jpg` or `.webp` files and update paths in Admin -> Team or database seed.
2. **Runway Gallery Photos:** Log in to `/admin/gallery` and upload high-resolution `.jpg`/`.png`/`.webp` files directly through the admin panel. Photos will be saved locally to `/server/uploads/` and served dynamically.

---

## ✦ Platform Features & Verification Checklist

- [x] **Cinematic Hero:** Luxury near-black (`#0C0A0B`) palette, gold (`#B89B5E`) accents, infinite marquee keyword ticker.
- [x] **Indian Motifs:** Custom SVG jaali lattice watermark, mandala dividers, and royal arch frames.
- [x] **Theme Showcase:** Interactive card switcher with per-theme color accents and concept narratives.
- [x] **Achievements Matrix:** Animated timeline with trophy counters and year filters covering 2022–2026.
- [x] **Filterable Gallery:** Masonry layout with category filtering and keyboard-navigable Lightbox.
- [x] **Activities & Why Join:** Alternating feature cards and bento grid value proposition.
- [x] **Audition Registration:** Form with validation (Zod + React Hook Form), rate limiting, and instant feedback.
- [x] **Admin Suite:** Protected dashboard, CRUD for gallery/awards/events, applicant status review, and 1-click CSV roster export.
- [x] **Footer Attribution:** Persistent credit `"Website crafted by GDGoC ITER"` across all views.

---

## ✦ License & Credits
* **Project:** VOGUE – SOA Fashion Club
* **Institution:** Siksha 'O' Anusandhan (SOA) University, Bhubaneswar
* **Development:** **GDGoC ITER**
