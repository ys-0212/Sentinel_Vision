# Deployment Guide - Deepfake Detection App

This guide will help you deploy the Deepfake Detection App to various platforms.

## 🚀 Quick Deploy to Vercel (Recommended)

### Step 1: Prepare Your Repository

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository
2. **Verify Structure**: Make sure all files are in place:
   ```
   ├── app/
   ├── components/
   ├── lib/
   ├── package.json
   ├── next.config.js
   ├── tailwind.config.js
   ├── tsconfig.json
   └── README.md
   ```

### Step 2: Deploy to Vercel

1. **Visit Vercel**: Go to [vercel.com](https://vercel.com) and sign in
2. **Import Project**: Click "New Project" and import your GitHub repository
3. **Configure Settings**:
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
4. **Environment Variables**: Add these in the Vercel dashboard:
   ```
   HIVE_API_URL=https://api.thehive.ai/api/v2
   NEXT_PUBLIC_APP_NAME=Deepfake Detection App
   ```
5. **Deploy**: Click "Deploy" and wait for the build to complete

### Step 3: Get Your API Key

1. **Visit Hive AI**: Go to [thehive.ai](https://thehive.ai)
2. **Create Account**: Sign up for a new account
3. **Get API Key**: Navigate to API settings and copy your key
4. **Configure App**: Use the API key in your deployed app's settings

## 🌐 Alternative Deployment Options

### Deploy to Netlify

1. **Build Locally**:
   ```bash
   npm run build
   npm run export
   ```

2. **Deploy**:
   - Drag and drop the `out` folder to Netlify
   - Or connect your GitHub repository

3. **Environment Variables**: Add in Netlify dashboard:
   ```
   HIVE_API_URL=https://api.thehive.ai/api/v2
   ```

### Deploy to Railway

1. **Connect Repository**: Link your GitHub repo to Railway
2. **Configure**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
3. **Environment Variables**: Add in Railway dashboard

### Deploy to DigitalOcean App Platform

1. **Create App**: Create a new app in DigitalOcean
2. **Connect Repository**: Link your GitHub repository
3. **Configure**:
   - Source: GitHub
   - Branch: main
   - Build Command: `npm run build`
   - Run Command: `npm start`
4. **Environment Variables**: Add in the app settings

## 🔧 Production Configuration

### Environment Variables

Set these in your deployment platform:

```env
# Required
HIVE_API_URL=https://api.thehive.ai/api/v2

# Optional
NEXT_PUBLIC_APP_NAME=Deepfake Detection App
NODE_ENV=production
```

### Build Optimization

1. **Enable Compression**: Add to `next.config.js`:
   ```javascript
   const nextConfig = {
     compress: true,
     poweredByHeader: false,
     // ... other config
   }
   ```

2. **Optimize Images**: Ensure proper image optimization:
   ```javascript
   images: {
     domains: ['your-domain.com'],
     formats: ['image/webp', 'image/avif'],
   }
   ```

### Security Headers

Add security headers in `next.config.js`:

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

## 📊 Monitoring & Analytics

### Add Analytics (Optional)

1. **Google Analytics**: Add to `app/layout.tsx`:
   ```javascript
   // Add Google Analytics script
   <Script
     src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
     strategy="afterInteractive"
   />
   ```

2. **Vercel Analytics**: Install and configure:
   ```bash
   npm install @vercel/analytics
   ```

### Error Monitoring

1. **Sentry**: Add error tracking:
   ```bash
   npm install @sentry/nextjs
   ```

2. **Configure**: Add Sentry configuration to your deployment

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API keys not exposed in client-side code
- [ ] File upload validation implemented
- [ ] Rate limiting configured
- [ ] Security headers added
- [ ] CORS properly configured

## 🚀 Performance Optimization

### Build Optimization

1. **Bundle Analyzer**: Add to analyze bundle size:
   ```bash
   npm install @next/bundle-analyzer
   ```

2. **Image Optimization**: Use Next.js Image component
3. **Code Splitting**: Implement dynamic imports
4. **Caching**: Configure proper caching headers

### CDN Configuration

1. **Vercel Edge Network**: Automatically enabled
2. **Custom Domain**: Configure in your deployment platform
3. **SSL Certificate**: Automatically handled by most platforms

## 📱 Mobile Optimization

1. **Responsive Design**: Already implemented with Tailwind CSS
2. **PWA Support**: Add service worker for offline functionality
3. **Touch Interactions**: Optimized for mobile devices

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (18+ required)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **API Errors**:
   - Verify API key is correct
   - Check Hive API status
   - Ensure proper CORS configuration

3. **File Upload Issues**:
   - Check file size limits
   - Verify supported file types
   - Check network connectivity

### Debug Mode

Enable debug logging:

```javascript
// Add to your API route
console.log('Debug info:', { fileSize, fileType, apiKey: '***' });
```

## 📞 Support

If you encounter deployment issues:

1. Check the platform's documentation
2. Review error logs in your deployment dashboard
3. Verify environment variables are set correctly
4. Test locally before deploying

---

**Happy Deploying! 🚀**
