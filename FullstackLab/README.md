# Assisterly Caregiver Dashboard Webpage

**Course Code**: 23IT721 — Full Stack Development Laboratory  
**Institution**: College Assignment Submission  
**Student Name**: Varun  
**Register Number**: 23IT721  

---

## Project Overview

**Assisterly** is a clinical-precision, custom-styled dashboard webpage prototype for a platform that connects families caring for paralyzed or bedridden individuals with background-verified house-helps and trained caregivers. 

Unlike generic tech-styled SaaS dashboards, Assisterly's design is tailored to reflect trust, safety, and clinical professionalism. The interface incorporates a custom warm color palette, precise serif/sans/monospace typography, and subtle medical visual motifs (such as EKG heartbeats and vital sign card borders) to deliver a calm and reliable user experience.

---

## 12 Required Sections Mapping

The table below demonstrates how each section defined in the assignment requirements maps to its exact implementation structure and HTML elements:

| Section Name | Target Section ID / Location | Semantic HTML Elements | Requirement Details & Design Strategy |
| :--- | :--- | :--- | :--- |
| **1. Header** | Top of the Page | `<header>`, `<svg>`, `<h1>`, `<span>` | Features the heartbeat SVG logo, application tagline, student name, and registration badge (`23IT721`) styled in monospace. |
| **2. Navigation Bar** | Sticky Top | `<nav>`, `<ul>`, `<li>`, `<a>` | Pine background. Horizontal links with hover active slide terracotta lines. Pushes "Logout" to the right. |
| **3. Welcome Section** | `#home` | `<section>`, `<div>`, `<h3>`, `<p>` | Features a platform description and side-by-side Mission & Vision cards highlighted with terracotta left-border accents. |
| **4. Dashboard Statistics** | `#dashboard` | `<section>`, `<div>`, `<span>` | 3-column stats grid of 6 vital-sign chart cards (Total Users, Active Users, Revenue, Transactions, Notifications, Pending Tasks) with sage borders. |
| **5. Features Section** | `#services` (Left Grid) | `<div>`, `<ul>`, `<li>`, `<strong>` | Lists 6 system features with custom terracotta bullet markers (`♦`). |
| **6. Services Section** | `#services` (Right Grid) | `<div>`, `<ol>`, `<li>`, `<strong>` | Lists 5 platform services using customized, pine-colored monospace list numbers. |
| **7. Latest Updates** | Between Services & Register | `<div>`, `<marquee>` | High-contrast pine banner scroll with emoji-prefixed alerts. |
| **8. Registration Form** | `#register` | `<section>`, `<form>`, `<input>`, `<textarea>`, `<button>` | Two-column responsive grid card with validation constraints, reset button, and visible sage outline focus indicators. |
| **9. Modules Table** | `#reports` | `<section>`, `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>` | Standardized clinical log table of 6 platform modules with terracotta monospace IDs and row-highlight on hover. |
| **10. About Section** | `#about` | `<section>`, `<div>`, `<p>` | Displayed on a warm sand panel featuring italicized serif typography. |
| **11. Contact Info** | `#contact` | `<section>`, `<div>`, `<svg>`, `<a>` | 4-card contact grid (Email, Phone, Office, and Social Links) collapsing dynamically on smaller viewports. |
| **12. Footer** | Bottom of the Page | `<footer>`, `<p>` | Centered copyright information and student registry details. |

---

## Design System & Typography

- **Color Palette Variables**:
  - Warm Linen Background: `#F7F5F0` (`--bg-linen`)
  - Deep Pine Primary: `#1F3D3B` (`--color-pine`)
  - Sand Panel Background: `#E8DCC8` (`--color-sand`)
  - Terracotta Highlight Accent: `#C66B3D` (`--color-terracotta`)
  - Ink Body Text: `#2C2C2C` (`--color-ink`)
  - Sage Secondary Accent: `#7A9E99` (`--color-sage`)
- **Typography Layout**:
  - Headings / Display: **Fraunces** (Serif font family)
  - Body Text: **Inter** (Sans-serif font family)
  - Technical / Stats / Badge: **JetBrains Mono** (Monospace font family)
- **Signature Accent**: EKG heartbeat SVGs styled in Sage green are embedded as clean divider lines separating structural layout zones.

---

## Local Run Instructions

No compilers or build environments are necessary. You can run this website using two simple methods:

### Method 1: Directly in Browser
1. Locate the project folder `FullstackLab`.
2. Double-click the [index.html](file:///c:/College/SEMVII/FullstackLab/index.html) file, or drag-and-drop it into any modern web browser (Chrome, Edge, Firefox, Safari).

### Method 2: Local HTTP Server (Python)
If you want to run the application over a local network port to verify responsive views on mobile devices:
1. Open your terminal or Command Prompt (cmd) inside the `FullstackLab` folder.
2. Run the following command:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to `http://localhost:8000`.

---

## Git & GitHub Deployment Instructions

To push the project files to a GitHub repository:

1. **Initialize Git**:
   ```bash
   git init
   ```
2. **Add Files to Staging**:
   ```bash
   git add .
   ```
3. **Commit Code Changes**:
   ```bash
   git commit -m "feat: complete Assisterly dashboard college lab assignment"
   ```
4. **Create Branch & Add Remote Repository**:
   *(Replace with your actual GitHub repository URL)*
   ```bash
   git branch -M main
   git remote add origin https://github.com/your-username/assisterly-dashboard.git
   ```
5. **Push Code to GitHub**:
   ```bash
   git push -u origin main
   ```

---

## Vercel Deployment Instructions

You can deploy the static site to Vercel using two methods:

### Method 1: Deployment via Vercel CLI (Command Line)
1. **Install Vercel globally** via npm (requires Node.js installed):
   ```bash
   npm install -g vercel
   ```
2. **Log in to Vercel**:
   ```bash
   vercel login
   ```
3. **Deploy the Site**:
   Run this command in the `FullstackLab` project folder:
   ```bash
   vercel
   ```
   - *Link to existing project?* **No**
   - *What's your project's name?* **assisterly-dashboard**
   - *In which directory is your code located?* **./**
   - *Want to modify settings?* **No** (Vercel will detect and apply `vercel.json` automatically).
4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Method 2: Deployment via Vercel Web Dashboard (No Installation)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and sign in using your GitHub account.
2. Click the **"Add New..."** button and select **"Project"**.
3. Import the GitHub repository `assisterly-dashboard` created during the Git steps.
4. Leave the Framework Preset as **"Other"** or **"Create React App"** (Vercel will build it statically since it's pure HTML/CSS).
5. Ensure the Build and Output settings are default.
6. Click **"Deploy"**. Vercel will build the project in seconds and provide a public URL (e.g. `assisterly-dashboard.vercel.app`).
