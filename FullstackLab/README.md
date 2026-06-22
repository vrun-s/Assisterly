# Interactive Caregiver Dashboard — Assisterly

**Course Code**: 23IT721 — Full Stack Development Laboratory  
**Institution**: College Assignment Submission  
**Student Name**: Varun  
**Register Number**: 23IT721  

---

## Project Overview

**Assisterly** is an industry-oriented caregiver dashboard prototype built using **HTML5, CSS3 (Vanilla), and Vanilla JavaScript**. It is designed for family members, caregivers, and administrative managers coordinating home-care for bedridden or paralyzed patients.

This project enhances the static structure of the initial assignment, introducing dynamic client-side scripting, light/dark themes, automatic image sliders, notification panels, customized scroll triggers, and real-time form validation controls.

---

## 18 Required Assignment Requirements Mapping

The table below describes how each of the 18 sections and interactive features maps to its corresponding implementation tags, styles, and script lines:

| S.No | Section / Component | Target HTML / CSS / JS | Implementation Strategy & Behavior |
| :--- | :--- | :--- | :--- |
| **1** | **Professional Theme** | `style.css` variables | Clinical warm linen light theme swapping dynamically to a deep-forest dark theme. High contrast and custom fonts. |
| **2** | **Navigation Bar** | `<nav>`, `initScrollSpy()` | Sticky header nav (Home, Dashboard, Features, Services, Reports, Contact, Logout). JavaScript automatically highlights active links based on viewport scroll position. |
| **3** | **Welcome Banner** | `#home`, `@keyframes fadeInUp` | Clean section featuring taglines and card overlays with a slide-in fade-in animation trigger on load. |
| **4** | **Dashboard Cards** | `#dashboard`, `.hover-lift` | Six stats cards styled like vital-signs charts. Interactive scale elevation and border glows on hover. |
| **5** | **Dynamic Statistics** | `initStatsCounters()` | JavaScript automatically increments numbers (e.g. users, revenue, alerts) from 0 to target values when the section scrolls into view. |
| **6** | **Features Section** | `#features`, `<ul>`, `♦` | Flex panel detailing core platform capabilities using terracotta-colored diamonds as markers. |
| **7** | **Services Section** | `#services`, `<ol>`, monospace numbers | Grid listing services with customized monospace, clinical-colored service numbers. |
| **8** | **Image Slider / Carousel**| `.slider-section`, `initSliderCarousel()` | Automated slide rotation cycling three generated caregiver graphics (`slide1.png`, `slide2.png`, `slide3.png`) with manual dot & arrow navigation buttons. |
| **9** | **Date & Time Display** | `#live-clock`, `initLiveClock()` | Dynamically updates time and date every second in the header, styled in monospace. |
| **10** | **Theme Switcher** | `body.dark-theme`, `initThemeSwitcher()` | Swaps styles using light/dark theme variables, saving choice inside browser `localStorage`. |
| **11** | **Notification Panel** | `#notification-panel`, `initNotificationPanel()` | Bell icon with unread badge count triggers sliding drawer panel. Alerts can be individually dismissed. |
| **12** | **Registration Form** | `#register`, `<form>` | Registration block collecting caregiver name, email, phone, password, gender, DOB, and address. |
| **13** | **Form Validation** | `initFormValidation()` | JS intercepts submits, validates name (text-only), email format, phone (Indian mobile), password strength, and age requirements (must be 18+). |
| **14** | **Animation Effects** | `style.css` keyframes | Renders Fade-In, Slide-In up, Heartbeat pulsing (logo), Icon Rotation (socials, toggle), and Typing blinking cursor on headings. |
| **15** | **Action Buttons** | `.btn`, `.slider-arrow`, `.theme-toggle-btn` | Dynamic visual transitions, click scale adjustments (`scale(0.98)`), and border changes. |
| **16** | **Scroll-to-Top Button** | `#scroll-top`, `initScrollToTop()` | Floating chevron button in bottom corner that fades in past `350px` scroll and smoothly scrolls to top on click. |
| **17** | **Contact Section** | `#contact`, `.contact-grid` | 4-card grid listing active coordinator email, helpline, address, and interactive text social links. |
| **18** | **Footer** | `<footer>` | Pine background bar displaying copyright, student name badge, and embedded social media SVG links. |

---

## Design System Variables

```css
:root {
  --bg-linen: #F7F5F0;          /* Warm base background */
  --color-pine: #1F3D3B;        /* Primary clinical pine green */
  --color-sand: #E8DCC8;        /* Panel container beige */
  --color-terracotta: #C66B3D;  /* Focus accent orange */
  --color-ink: #2C2C2C;         /* Body copy charcoal */
  --color-sage: #7A9E99;        /* Secondary dividers outline */
}
```

---

## Local Run Instructions

No compile systems or node build tasks are needed. Run the application through:

### Method 1: File Launch
1. Open the `FullstackLab` folder on your local computer.
2. Double-click the [index.html](file:///c:/College/SEMVII/FullstackLab/index.html) file to load it in any browser.

### Method 2: Python Port Host
To test scripts and clock updates over a local network:
1. Open terminal inside the project directory and run:
   ```bash
   python -m http.server 8080
   ```
2. Navigate to `http://localhost:8080` in your web browser.

---

## Deployment Instructions

### Git Push Steps
1. **Prepare staging**:
   ```bash
   git add .
   ```
2. **Commit changes**:
   ```bash
   git commit -m "feat: complete Assignment 2 interactive dashboard enhancements"
   ```
3. **Push to repository**:
   ```bash
   git push origin main
   ```

### Vercel Deployment
- **CLI Method**: Run `vercel --prod` to deploy updates directly.
- **Dashboard Method**: Vercel automatically detects commits pushed to your connected GitHub branch and redeploys the live site in seconds.
