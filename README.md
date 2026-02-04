<div align="center">

# 🚀 Science & Innovation Club - GEC Palamu

### _Where Ideas Transform Into Reality_

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.29.0-FF0080?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

_A cutting-edge web platform for the Science and Innovation Club at Government Engineering College Palamu_

[Live Demo](https://sic-gecp.vercel.app) • [Report Bug](https://github.com/xrounak/SIC-GECP/issues) • [Request Feature](https://github.com/xrounak/SIC-GECP/issues)

</div>

---

## ✨ Features

### 🎨 **8 Stunning Intro Themes**
Experience a unique visual journey every time you visit! Choose from:
- 🌌 **Cyberpunk Tech** - Matrix-style digital rain with glitch effects
- 🎯 **Brutalism** - Bold, industrial design with powerful animations
- 🌑 **AMOLED Dark** - Sleek, minimal with neon accents
- 🏔️ **Neumorphism** - Soft, tactile 3D effects
- 🎨 **Claymorphism** - Playful, colorful bubbles
- 💎 **Glassmorphism** - Elegant frosted glass aesthetics
- ✨ **Minimalism** - Clean, refined typography
- 🌈 **Default** - Professional gradient theme

### 🔥 **Core Functionality**
- 📅 **Event Management** - Discover and register for workshops, hackathons, and tech talks
- 👥 **Team Showcase** - Meet our talented members and leadership
- 🖼️ **Dynamic Gallery** - Explore moments from our innovation journey
- 📝 **Join Application** - Seamless onboarding for new members
- 🔐 **Admin Dashboard** - Comprehensive content management system
- 🎨 **Theme Persistence** - Your visual preference, remembered across sessions

### ⚡ **Technical Excellence**
- 🚀 **Lightning Fast** - Built with Vite for optimal performance
- 📱 **Fully Responsive** - Perfect experience on all devices
- ♿ **Accessible** - WCAG compliant with semantic HTML
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🔒 **Secure** - Supabase authentication and RLS policies
- 🌐 **SEO Optimized** - React 19 native head management

---

## 🛠️ Tech Stack

### **Frontend**
```
React 19.2         - Latest React with native head management
TypeScript 5.9     - Type-safe development
Vite 7.2          - Next-generation build tool
Tailwind CSS 4.1  - Utility-first styling
Framer Motion     - Production-ready animations
React Router 7    - Client-side routing
Lucide React      - Beautiful icon system
```

### **Backend & Infrastructure**
```
Supabase          - Database, Auth, and Storage
Vercel            - Deployment and hosting
Telegram Bot API  - Real-time notifications
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for backend features)
- Telegram Bot Token (optional, for notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/xrounak/SIC-GECP.git
   cd SIC-GECP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   VITE_TELEGRAM_CHAT_ID=your_telegram_chat_id
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
sic-website/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 🎬 Intro*.tsx      # 8 themed intro animations
│   │   ├── 🎨 ThemeSwitcher.tsx
│   │   └── 📦 EventCard.tsx, MemberCard.tsx, etc.
│   ├── 📁 pages/              # Route components
│   │   ├── 🏠 Home.tsx
│   │   ├── 📅 Events.tsx
│   │   ├── 👥 Members.tsx
│   │   ├── 🖼️ Gallery.tsx
│   │   ├── 📝 Join.tsx
│   │   ├── 🔐 Login.tsx
│   │   └── 🛡️ Admin.tsx
│   ├── 📁 context/            # React context providers
│   │   └── ThemeContext.tsx
│   ├── 📁 services/           # External API integrations
│   │   └── supabaseClient.ts
│   ├── 📁 utils/              # Helper functions
│   │   └── telegram.ts
│   ├── 📁 types/              # TypeScript definitions
│   └── 📄 App.tsx, main.tsx, index.css
├── 📁 public/                 # Static assets
├── 📄 package.json
├── 📄 vite.config.ts
├── 📄 tailwind.config.ts
└── 📄 tsconfig.json
```

---

## 🎨 Theme System

The website features a dynamic theme system with 8 unique visual experiences:

| Theme | Description | Best For |
|-------|-------------|----------|
| 🌌 Cyberpunk | Matrix rain + glitch effects | Tech enthusiasts |
| 🎯 Brutalism | Bold, industrial aesthetics | Modern designers |
| 🌑 AMOLED | Deep blacks + neon accents | Dark mode lovers |
| 🏔️ Neumorphism | Soft 3D shadows | Minimalists |
| 🎨 Claymorphism | Playful bubbles | Creative minds |
| 💎 Glassmorphism | Frosted glass blur | Elegance seekers |
| ✨ Minimalism | Clean typography | Professionals |
| 🌈 Default | Gradient vibrancy | Everyone |

Themes are persisted using `localStorage` for a seamless experience across sessions.

---

## 🗄️ Database Schema

### Tables Overview
- `events` - Event information and scheduling
- `members` - Team member profiles
- `gallery` - Image collection with metadata
- `join_applications` - Membership requests
- `event_registrations` - Event participant tracking

All tables include Row Level Security (RLS) policies for data protection.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test thoroughly before submitting
- Update documentation as needed

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developers

<div align="center">

### Built with ❤️ by the SIC Team

**Lead Developer**: [Rounak Kumar](https://github.com/xrounak)

---

### 🌟 Star us on GitHub!

If you find this project useful, please consider giving it a ⭐

[![GitHub stars](https://img.shields.io/github/stars/xrounak/SIC-GECP?style=social)](https://github.com/xrounak/SIC-GECP)

</div>

---

## 📬 Contact

- 🌐 Website: [sic-gecp.vercel.app](https://sic-gecp.vercel.app)
- 📧 Email: sic@gecpalamu.ac.in
- 💬 Telegram: [Join our community](https://t.me/sicgecp)

---

<div align="center">

### 🚀 **Science & Innovation Club**
_Government Engineering College Palamu_

**Innovate. Build. Deploy.**

</div>
