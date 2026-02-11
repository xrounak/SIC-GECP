# 🛠️ Developer Documentation

Welcome to the **Science and Innovation Club (SIC)** website codebase! This project is built with React, TypeScript, Tailwind CSS, and Supabase.

## 📂 Project Structure

```text
src/
├── assets/          # Static assets (images, icons)
├── components/
│   ├── admin/       # Management components for the Admin Dashboard
│   ├── common/      # Reusable UI elements (Buttons, OptimizedImage, Skeleton, Cards)
│   ├── intro/       # Intro animation variations and the IntroManager
│   └── layout/      # Core layout components (Navbar, Footer, ThemeSwitcher)
├── context/         # React Context (Theme Management)
├── hooks/           # Custom React hooks
├── pages/           # Page components (Home, Events, Members, Gallery, etc.)
├── services/        # Backend services (Supabase Client)
├── types/           # TypeScript definitions
└── utils/           # Helper functions (Telegram notifications, etc.)
```

## 🚀 Getting Started

1.  **Install Dependencies**: `npm install`
2.  **Environment Setup**: Create a `.env` file based on `.env.example` with your Supabase and Telegram credentials.
3.  **Run Dev Server**: `npm run dev`
4.  **Production Build**: `npm run build`

## 🎨 Theme & Intro System

The website features a unique "Theme Design System" where switching themes doesn't just change colors—it changes the entire visual language (CSS tokens, border-radius, shadows).

### Adding a New Intro
1.  Create your component in `src/components/intro/IntroYourTheme.tsx`.
2.  Add your theme ID to `ThemeDesign` in `src/context/ThemeContext.tsx`.
3.  Register your new intro in `src/components/intro/IntroManager.tsx`.
4.  Add CSS tokens for your theme in `src/index.css`.

## 🗄️ Backend (Supabase)

- **Auth**: Only authenticated users can access the `/admin` route.
- **RLS**: Row Level Security is enabled. Public can read content, but only Admins can mutate.
- **Database Schema**: Refer to `supabase/schema.sql`.

## 📸 Image Optimization

Always use the `<OptimizedImage />` component instead of `<img>`. It provides:
- Automatic Shimmer Skeleton while loading.
- Native browser lazy loading.
- Framer Motion fade-in transition.

## 📝 Performance Tips

- Keep animations within `framer-motion` where possible for GPU acceleration.
- Use the `common/Skeleton` component to maintain layout stability during data fetching.
- Assets in `public/` are served directly; assets in `src/assets/` are hashed by Vite.

---
*Happy coding! — Built with ❤️ for SIC*
