# Grupo Alborvia Website

A premium React website for Grupo Alborvia with advanced animations, geometric abstractions, and modern typography.

## Tech Stack

- **React 18** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Premium Fonts

- **Cormorant Garamond** - Elegant serif for headlines
- **Outfit** - Modern sans-serif for body text

## Quick Start

```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev

# Build for production
npm run build
# or
pnpm build

# Preview production build
npm run preview
```

## Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify
1. Push code to GitHub
2. Connect repo in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Manual Deployment
1. Run `npm run build`
2. Upload contents of `dist/` folder to your hosting

## Project Structure

```
├── index.html          # Entry HTML with font imports
├── package.json        # Dependencies
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── src/
    ├── main.tsx        # React entry point
    ├── App.tsx         # Main application component
    ├── App.css         # Custom styles
    └── index.css       # Tailwind imports
```

## Customization

### Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --amber-500: #f59e0b;
  --orange-500: #f97316;
  --slate-950: #020617;
  /* ... */
}
```

### Contact Email
Update email in `src/App.tsx`:
```tsx
karen@alborvia.com
```

## License

© 2025 Grupo Alborvia S.A. de C.V.
