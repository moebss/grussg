# 💌 Grussgenerator.de - Landing Page

> **Der perfekte Text für jeden Anlass** - KI-generierte Grüße für Geburtstage, Hochzeiten, Neujahr & mehr.

## 🌟 Features

### ✨ Premium Design
- **Glassmorphism UI** - Modernes, durchsichtiges Design
- **Particle Animation** - Schwebende Goldpartikel im Hintergrund
- **Typewriter-Effekt** - Dynamische Headline-Animation
- **Smooth Scroll Animations** - Sections erscheinen beim Scrollen
- **Konfetti-Explosion** - Nach Newsletter-Anmeldung

### 🎯 Content Sections
- **Hero Section** mit Newsletter-Signup
- **Live Countdown** bis zum Launch
- **Use Cases** - 6 Karten für verschiedene Anlässe
- **How It Works** - 3-Schritt-Anleitung
- **Demo Preview** - Rotierende Beispiel-Grüße
- **FAQ Accordion** - Häufige Fragen
- **Footer** mit Links & Social Media

### 🔧 Technical Features
- **SEO-optimiert** - Meta-Tags, OG-Tags
- **Responsive** - Mobile-first Design
- **Performance** - Optimierte Animationen
- **Newsletter-Integration** - Supabase Backend

## 🚀 Tech Stack

- **HTML5** - Semantic Structure
- **CSS3** - Custom Properties, Animations
- **Vanilla JavaScript** - No dependencies
- **Vercel** - Deployment
- **Supabase** - Newsletter Database

## 📦 Project Structure

```
grussgenerator/
├── index.html          # Main HTML
├── style.css           # Premium Styling
├── script.js           # Interactive Features
├── api/
│   └── subscribe.js    # Newsletter API
├── vercel.json         # Deployment Config
└── README.md           # This file
```

## 🎨 Design Highlights

### Color Palette
- **Background**: `#050510` (Deep Navy)
- **Primary**: `#ffd700` (Gold)
- **Accent**: `#c77dff` (Purple)
- **Text**: `#ffffff` / `#a0a0b0`

### Animations
- Particle system with 80 floating particles
- Typewriter effect cycling through 6 texts
- Confetti explosion (100 pieces)
- Smooth scroll reveal animations
- FAQ accordion transitions

## 🛠️ Development

### Local Setup
```bash
# Clone the repository
git clone https://github.com/moebss/grussg.git

# Navigate to directory
cd grussg

# Open in browser
open index.html
```

### Deploy to Vercel
```bash
vercel deploy
```

## 📊 Newsletter System

The newsletter signup uses the same Supabase backend as `neujahrsgruss2026.de`:

**API Endpoint**: `/api/subscribe`
**Method**: POST
**Body**: `{ "email": "user@example.com" }`

## 🎯 Roadmap

- [ ] Add more demo texts
- [ ] Implement A/B testing for CTAs
- [ ] Add video background option
- [ ] Create blog section
- [ ] Multi-language support

## 📄 License

© 2026 Alexander Rheindorf | All rights reserved

## 🤝 Credits

- **Design**: Premium Glassmorphism UI
- **Fonts**: Google Fonts - Outfit
- **Icons**: Emoji (Native)
- **Developer**: Alexander Rheindorf

---

**Made with ❤️ and ✨**
