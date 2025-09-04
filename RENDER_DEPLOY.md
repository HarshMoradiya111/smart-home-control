# Deploy to Render - Complete Guide

## 🚀 Quick Deploy to Render

Your finance app is now configured for deployment to Render! Follow these steps to get your app live.

### 📋 Prerequisites
- Git repository pushed to GitHub (already configured)
- Render account (free to create)

### 🔗 Step-by-Step Deployment

#### 1. Create Render Account
- Go to [render.com](https://render.com)
- Sign up with your GitHub account
- Verify your email

#### 2. Create New Web Service
- Click "New" → "Web Service"
- Connect your GitHub account
- Select your repository: `smart-home-control` (or your actual repo name)

#### 3. Configure Build Settings
- **Name**: `finance-app` (or your preferred name)
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

#### 4. Environment Variables (Optional)
If you have any API keys or environment variables, add them in the "Environment" section.

#### 5. Deploy
- Click "Create Web Service"
- Render will automatically deploy your app
- Your app will be live at: `https://your-app-name.onrender.com`

### 📁 Files Added for Render
- `server.js` - Express server for production
- `render.yaml` - Render configuration file
- Updated `package.json` - Added Express dependency and start script
- Updated `vite.config.ts` - Removed GitHub Pages base path

### ✅ Verification Steps
1. **Local Test**: Run `npm start` to verify server works locally
2. **Build Test**: Run `npm run build` to ensure production build succeeds
3. **Git Push**: Push changes to GitHub: `git add . && git commit -m "Configure for Render deployment" && git push`

### 🔄 Continuous Deployment
- Every push to your main branch will trigger a new deployment
- Render automatically rebuilds and redeploys your app

### 🛠️ Troubleshooting
- **Port Issues**: Ensure PORT environment variable is set correctly
- **Build Failures**: Check build logs in Render dashboard
- **Dependencies**: Ensure all dependencies are listed in package.json

### 📊 Resource Limits (Free Tier)
- 512 MB RAM
- 0.1 CPU
- 100 GB bandwidth
- Sleeps after 15 minutes of inactivity

### 🎯 Next Steps
1. Visit your live app URL
2. Test all functionality
3. Set up custom domain (optional)
4. Monitor performance in Render dashboard

Your app is now production-ready for Render deployment! 🚀