# MedStream Global — Developer Guide & Architecture Documentation

Welcome to **MedStream Global**, an enterprise surgical & medical masterclass video archive platform. This codebase is architected with a high-performance, zero-dependency client architecture, robust clinical data-binding semantics, and a multi-page static site structure optimized for low latency and high accessibility.

---

## 📁 Table of Contents

1. [Product Overview](#product-overview)
2. [Directory Structure](#directory-structure)
3. [Page Architecture & User Journeys](#page-architecture--user-journeys)
4. [Data Binding & Crawler Architecture](#data-binding--crawler-architecture)
5. [Interactive Surgical Video Engine](#interactive-surgical-video-engine)
6. [Design System & Theming](#design-system--theming)
7. [Development & Build Commands](#development--build-commands)
8. [Developer Customization Guide](#developer-customization-guide)

---

## 🩺 Product Overview

**MedStream Global** provides medical professionals, surgical residents, and fellows with high-definition, multi-angle clinical procedures, accredited CME masterclasses, and peer-reviewed surgical commentary.

### Core Capabilities
- **Multi-Angle Video Playback**: 16:9 theater player featuring simultaneous camera lines (Primary 4K da Vinci robotics, 30° rigid endoscopy, and intraoperative anesthesia telemetry).
- **Procedural Chapter Navigation**: Direct jumping to specific operative phases (e.g., Trocar Placement, Calot's Triangle Dissection, CVS Verification).
- **Semantic Field Binding**: Standardized `data-f` tags for automated metadata extraction and CMS templating.
- **Search & Multi-Dimensional Filtering**: Querying across surgical specialties, accreditation levels (CME Category 1, Peer Reviewed), release years, and sorting metrics.
- **Full Theme Support**: System-aware and user-toggleable Light & Dark modes with persistent storage.

---

## 📂 Directory Structure

```
.
├── index.html              # Homepage: Hero masterclass, leaderboard & curated cases
├── list.html               # Catalog: Filterable procedure archive with pagination
├── detail.html             # Case Protocol: Full clinical metadata, synopsis & camera list
├── play.html               # Video Player: 16:9 interactive theater & multi-line switch
├── search.html             # Search & Discovery: Query engine, live count & empty state
├── sitemap.xml             # Search engine XML sitemap
├── spider.xml              # Crawler/spider ingestion map
├── assets/
│   ├── favicon.svg         # High-resolution vector medical favicon
│   ├── style.css           # Complete design system, theme tokens & layout styles
│   └── app.js              # Client controller, search filtering & player HUD
├── public/
│   └── favicon.svg         # Root static favicon
├── metadata.json           # Platform application metadata
├── package.json            # Build scripts and development dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Multi-entry Vite bundle configuration
```

---

## 🌐 Page Architecture & User Journeys

| Page | File | Purpose & Key Components |
|---|---|---|
| **Home** | `index.html` | Featured Hero Masterclass banner, Category Ranking Leaderboard, specialty badge rows, curated `data-list="vod"` grid, and `data-list="tag"` taxonomy cloud. |
| **Catalog List** | `list.html` | Multi-category filter bars (Specialty, Year, Accreditation, Sort By), responsive 6-column surgical case cards, and interactive pagination controls. |
| **Case Detail** | `detail.html` | Clinical breadcrumb navigation, structured metadata table (`vod_actor`, `vod_score`, `vod_hits`, `vod_area`), collapsible surgical protocol (`vod_blurb`), and related procedure suggestions. |
| **Video Player** | `play.html` | Strict 16:9 `.player` container, interactive HUD (play/pause, timeline seek, speed toggle, fullscreen), and multi-source line tabs (`.playlist`) with 40+ operative chapter modules. |
| **Search** | `search.html` | Dedicated query box with quick-filter chips, real-time result count indicator, dedicated empty state block (`#searchEmptyState`) with reset trigger, and matching procedure results. |

---

## 🏷️ Data Binding & Crawler Architecture

The platform uses a clean, predictable micro-templating convention for programmatic ingestion, scrapers, and headless CMS integrations:

### 1. Card Container: `data-list="vod"`
Enclosing grids must include the attribute `data-list="vod"`.

### 2. Template Field Attributes (`data-f="..."`)
Each template card uses `data-f` attributes matching clinical content fields:

| Field Name | Description | Example Content |
|---|---|---|
| `vod_name` | Name of surgical procedure | `Robotic-Assisted Laparoscopic Cholecystectomy` |
| `vod_pic` | Cover poster / SVG illustration | `data:image/svg+xml;utf8,...` |
| `vod_score` | Peer review / editorial score | `9.9` |
| `vod_remarks` | Stream resolution / format badge | `4K UHD Masterclass` |
| `vod_year` | Procedure recording year | `2026` |
| `vod_area` | Medical institution or country | `Johns Hopkins Medicine (USA)` |
| `vod_lang` | Audio track commentary language | `English (Clinical Voiceover)` |
| `vod_class` | Accreditation / specialty class | `CME Category 1 (2.5 Credits)` |
| `type_name` | Primary surgical subspecialty | `Minimally Invasive General Surgery` |
| `vod_actor` | Lead surgeons / operators | `Dr. Katherine Vance, MD, FACS` |
| `vod_director`| Clinical or department director | `Prof. Alexander Sterling, MD` |
| `vod_blurb` | Operative protocol synopsis | `Detailed surgical masterclass highlighting...` |
| `vod_time` | Archive publication timestamp | `2026-08` |
| `vod_hits` | Verified peer view count | `312,400 Verified Clinical Views` |

### 3. Specialty Tag Container: `data-list="tag"`
Taxonomy tags are enclosed in a container with `data-list="tag"`, linking directly to targeted search queries.

---

## 🎮 Interactive Surgical Video Engine

The player in `play.html` combines standard media controls with an HTML5 `<canvas>` rendering engine (`#surgicalCanvas`) in `assets/app.js`:

- **Active Camera Line Switching**:
  - **Line 1**: Primary Surgical View (da Vinci Xi 4K robotic optics) — 22 chapter modules.
  - **Line 2**: Endoscopic Feed (30° rigid laparoscope inspection) — 10 chapter modules.
  - **Line 3**: Vital Signs & OR Telemetry (Real-time ECG trace, ETCO2, MAP, O2 sat) — 8 chapter modules.
- **Dynamic Telemetry Rendering**: Renders real-time ECG waveforms, camera reticle overlays, and current chapter timestamps via `requestAnimationFrame`.
- **Keyboard Shortcuts**: Spacebar to Play/Pause, Left/Right arrows to seek ±5s, and 'F' for Fullscreen.

---

## 🎨 Design System & Theming

The platform styles are defined in `assets/style.css` using modern CSS custom properties:

```css
:root {
  --bg-primary: #0b1120;
  --bg-secondary: #0f172a;
  --bg-surface: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --accent-cyan: #0284c7;
  --accent-teal: #0f766e;
  --border-subtle: rgba(255, 255, 255, 0.08);
}

[data-theme="light"] {
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --bg-surface: #f1f5f9;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  /* ... */
}
```

Theme changes are managed automatically via `assets/app.js` and persisted in `localStorage.getItem('theme')`.

---

## 🛠️ Development & Build Commands

This project uses **Vite** with multi-page HTML bundling:

### 1. Start Local Development Server
```bash
npm run dev
```
Starts the local dev server on `http://localhost:3000`.

### 2. Production Build
```bash
npm run build
```
Compiles and bundles static output to `dist/`, including all HTML pages, CSS stylesheets, and JavaScript assets.

### 3. Type Checking & Linter
```bash
npm run lint
```
Runs TypeScript compiler validation with `--noEmit`.

---

## 🔧 Developer Customization Guide

### Adding a New Video Case
To add a new surgical case to any grid, insert a `.vod-card` inside a `div[data-list="vod"]`:

```html
<div class="vod-card">
  <div class="vod-cover-wrap">
    <img data-f="vod_pic" src="/path/to/poster.jpg" alt="Poster">
    <span class="badge badge-score vod-badge-top-left" data-f="vod_score">9.8</span>
    <span class="vod-badge-bottom-right" data-f="vod_time">2026-08</span>
  </div>
  <div class="vod-info">
    <a href="detail.html" class="vod-title" data-f="vod_name">Procedure Title</a>
    <div class="vod-sub-meta">
      <span data-f="type_name">Surgical Specialty</span>
      <span data-f="vod_remarks">4K HDR</span>
    </div>
    <div class="vod-surgeon-line" data-f="vod_actor">Lead Surgeon, MD</div>
  </div>
</div>
```

### Extending Camera Feeds in Player
In `play.html`, add new stream tabs within `.line-tabs` and corresponding `.line-content-pane` sections matching the `data-line` identifier. `assets/app.js` automatically binds click events to switch lines and load corresponding chapter module buttons.

---

© 2026 MedStream Global. All rights reserved. Enterprise Surgical & Medical Masterclass Archive.
