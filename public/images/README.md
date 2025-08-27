# SEO Image Assets

This directory contains optimized images for SEO and social media sharing.

## Required Images for Complete SEO:

### Open Graph & Twitter Cards

- `og-image.png` (1200x630px) - Main social sharing image
- `og-image-home.png` (1200x630px) - Homepage specific image
- `og-image-demo.png` (1200x630px) - Demo page specific image

### Favicons & Icons

- `favicon.ico` (32x32px) - Main favicon
- `apple-touch-icon.png` (180x180px) - Apple devices
- `android-chrome-192x192.png` (192x192px) - Android Chrome
- `android-chrome-512x512.png` (512x512px) - Android Chrome

### Logo & Branding

- `logo.png` (200x50px) - Main logo for structured data
- `logo-dark.png` (200x50px) - Dark mode logo
- `screenshot.png` (1920x1080px) - App screenshot for WebApplication schema

## Image Optimization Tips:

1. **Format**: Use WebP or AVIF for better compression
2. **Size**: Optimize file sizes while maintaining quality
3. **Alt Text**: Always provide descriptive alt text
4. **Lazy Loading**: Use Next.js Image component for automatic optimization
5. **Priority Loading**: Mark above-the-fold images as priority

## Next.js Image Component Usage:

```tsx
import Image from 'next/image'

// Priority loading for above-the-fold images
<Image
  src="/og-image.png"
  alt="Next.js Auth Template"
  width={1200}
  height={630}
  priority
/>

// Standard lazy loading
<Image
  src="/screenshot.png"
  alt="App Screenshot"
  width={1920}
  height={1080}
  loading="lazy"
/>
```

## SEO Image Checklist:

- [ ] Create og-image.png (1200x630)
- [ ] Create logo.png for structured data
- [ ] Optimize all images for web
- [ ] Add proper alt text
- [ ] Test social sharing previews
- [ ] Validate image URLs in structured data
