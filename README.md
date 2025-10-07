# Expandable Card Component - Next.js Starter

A clean, minimal Next.js project demonstrating the **ExpandableCard** component with **Motion v11** (Framer Motion), **Tailwind CSS**, and smooth layout animations.

![Demo](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat-square&logo=next.js) ![Motion](https://img.shields.io/badge/Motion-v11-purple?style=flat-square) ![Tailwind](https://img.shields.io/badge/Tailwind-v3-blue?style=flat-square)

---

## 🚀 Quick Start

### Run Locally

```bash
# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Start dev server
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the expandable cards demo.

---

### Deploy to CodeSandbox

#### Method 1: Drag & Drop
1. Go to [codesandbox.io](https://codesandbox.io)
2. Click **"Create Sandbox"** → **"Import from GitHub"** or **"Upload files"**
3. Drag the **entire project folder** into the upload area
4. CodeSandbox will auto-install dependencies and start the dev server

#### Method 2: Import from GitHub
1. Push this project to a GitHub repo
2. Go to CodeSandbox → **Import** → paste your GitHub URL
3. CodeSandbox will clone and build automatically

#### Method 3: Manual Upload
1. Zip this entire folder (excluding `node_modules` and `.next`)
2. Upload to CodeSandbox via **"Import from ZIP"**

**Expected result:** ✅ Build succeeds, no font errors, animations work smoothly.

---

## 📦 What's Inside

```
├── src/
│   ├── app/
│   │   ├── page.tsx               # Demo page with 3 cards
│   │   ├── layout.tsx             # Root layout with Inter font
│   │   └── globals.css            # Tailwind + theme variables
│   ├── components/
│   │   ├── ui/
│   │   │   └── expandable-card.tsx  # ⭐ Main component
│   │   └── content-4.tsx          # Section rendering 3 cards
│   ├── hooks/
│   │   └── use-outside-click.ts   # Click-outside detection
│   └── lib/
│       └── cn.ts                  # Classname utility
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎨 Component Usage

### Basic Example

```tsx
import { ExpandableCard } from "@/components/ui/expandable-card";

export default function MyPage() {
  return (
    <ExpandableCard
      title="Actionable Insights"
      description="Surface what matters most"
      src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600"
      ctaText="+"
    >
      <p>Your expanded content goes here.</p>
      <ul>
        <li>Bullet point 1</li>
        <li>Bullet point 2</li>
      </ul>
    </ExpandableCard>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Card title (shown in collapsed & expanded) |
| `description` | `string?` | `undefined` | Short description (shown in collapsed state) |
| `src` | `string?` | Random image | Image URL for card background |
| `children` | `ReactNode?` | Placeholder text | Content shown in expanded modal |
| `className` | `string?` | `""` | Additional classes for collapsed card |
| `classNameExpanded` | `string?` | `""` | Additional classes for modal container |
| `ctaText` | `string?` | `"+"` | Text for the CTA button |

---

## 🎭 Features

- ✅ **Smooth layout animations** using Motion v11 `layoutId`
- ✅ **Shared element transitions** between collapsed & expanded states
- ✅ **Click outside to close** (via `useOutsideClick` hook)
- ✅ **ESC key to close**
- ✅ **Backdrop blur** overlay
- ✅ **Responsive design** (mobile-first)
- ✅ **Dark mode support** (respects system preference)
- ✅ **External images** (uses Unsplash URLs by default)

---

## 🛠️ Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 14.2.15 | React framework |
| `react` | 18.3.1 | UI library |
| `motion` | ^11.11.17 | Animations (Framer Motion v11) |
| `tailwindcss` | ^3.4.13 | Utility-first CSS |
| `lucide-react` | ^0.460.0 | Icons (Plus, X) |
| `clsx` | ^2.1.1 | Classname utility |

---

## 🔧 Customization

### Change Font
Edit `src/app/layout.tsx`:
```tsx
import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
```

### Add Custom Images
Replace the `src` prop with your own URLs:
```tsx
<ExpandableCard
  src="/images/my-image.jpg"
  // ... other props
/>
```

Or place images in `public/images/` and reference them as `/images/filename.jpg`.

### Adjust Animation Timing
Edit `src/components/ui/expandable-card.tsx` and modify the `motion` props:
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }} // ← Adjust here
>
```

---

## 🐛 Troubleshooting

### "Unknown font 'Geist'" error
✅ **Fixed!** The starter now uses **Inter** from Google Fonts. If you still see this error:
1. Clear CodeSandbox cache (restart sandbox)
2. Delete `.next` folder locally and rebuild
3. Ensure `src/app/layout.tsx` imports `Inter` from `next/font/google`

### Images not loading
- Check that the image URLs are accessible (not behind a firewall)
- For local images, ensure they're in the `public/` folder
- Verify `next.config.mjs` has `images.domains` configured if using external hosts

### Build fails in CodeSandbox
- Ensure `package.json` dependencies match the versions above
- Try forking the sandbox and rebuilding
- Check browser console for specific errors

---

## 📝 Notes

- **Path aliases**: `@/*` maps to `src/*` (configured in `tsconfig.json`)
- **Client component**: `ExpandableCard` uses `"use client"` directive (required for Motion & hooks)
- **Dark design**: Uses neutral grays and sophisticated gradients for a modern, Linear-inspired aesthetic
- **Motion v11**: Uses `motion/react` import path (not `framer-motion`)

---

## 🤝 Contributing

Found a bug or want to improve this starter? Open an issue or PR!

---

## 📄 License

MIT - feel free to use this in your projects!

---

**Built with ❤️ using Next.js, Motion v11, and Tailwind CSS**
