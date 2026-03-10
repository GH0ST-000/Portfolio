# 🚀 Quick Start Guide

Get your portfolio up and running in 5 minutes!

## ✅ Prerequisites Check

Make sure you have:
- ✓ PHP 8.2+ installed
- ✓ Composer installed
- ✓ Node.js 18+ and NPM installed

## 📦 Installation (Step by Step)

### 1. Navigate to the project
```bash
cd portfolio-app
```

### 2. Install Dependencies
```bash
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install --legacy-peer-deps
```

### 3. Environment Setup
```bash
# The .env file should already exist
# Key is already generated
# Database file already exists and is migrated
```

### 4. Build Assets
```bash
# For production
npm run build

# OR for development with hot reload
npm run dev
```

### 5. Start the Server
```bash
php artisan serve
```

## 🎯 Access Your Portfolio

Open your browser and visit:

### Portfolio Website
**URL:** http://localhost:8000

This is your public portfolio with:
- Hero section with Three.js animation
- About section
- Skills showcase
- Projects gallery
- Work experience timeline
- Contact form

### Admin Panel
**URL:** http://localhost:8000/admin

**Login Credentials:**
- Email: `admin@example.com`
- Password: `password`

⚠️ **IMPORTANT:** Change these credentials in production!

## 📝 Sample Data

The database comes pre-populated with sample data:
- 3 sample projects
- 11 skills across 3 categories (Frontend, Backend, Tools)
- 3 work experiences

You can edit or delete this data from the admin panel.

## 🎨 Customization Quick Tips

### 1. Update Your Personal Info

**Hero Section** (`resources/js/Components/Portfolio/HeroSection.vue`):
- Line 8: Change "Your Name"
- Line 12: Update job titles in the `phrases` array

**About Section** (`resources/js/Components/Portfolio/AboutSection.vue`):
- Update the paragraphs with your story

### 2. Update Social Links

Update your social media links in:
- `HeroSection.vue` (around line 32)
- `Footer.vue` (around line 14)

Replace the URLs:
```vue
<a href="https://github.com/yourusername" ...>
<a href="https://linkedin.com/in/yourusername" ...>
<a href="https://twitter.com/yourusername" ...>
```

### 3. Change Color Theme

The default theme uses:
- Primary: Indigo (`indigo-500`)
- Secondary: Purple (`purple-600`)
- Background: Dark gray (`gray-900`)

To change colors, search and replace in all Vue files:
- `indigo-500` → your primary color
- `purple-600` → your secondary color

## 🎬 Add Your Content

### Add a New Project

1. Go to http://localhost:8000/admin
2. Click "Projects" in sidebar
3. Click "New Project"
4. Fill in the details:
   - Title
   - Description
   - Technologies (enter as JSON array: `["Laravel", "Vue.js"]`)
   - GitHub URL
   - Live URL
   - Upload image (optional)
   - Check "Featured" to highlight it
5. Click "Create"

### Add Skills

1. Go to "Skills" in admin panel
2. Click "New Skill"
3. Enter:
   - Name (e.g., "JavaScript")
   - Category (e.g., "Frontend", "Backend", "Tools")
   - Proficiency (0-100)
4. Click "Create"

### Add Experience

1. Go to "Experiences" in admin panel
2. Click "New Experience"
3. Fill in your work history
4. Check "Is Current" if you're still working there
5. Click "Create"

## 🐛 Common Issues

### Issue: Three.js animation not showing
**Solution:** 
```bash
npm run build
# Refresh browser with Ctrl+F5 (force refresh)
```

### Issue: Admin panel shows 404
**Solution:**
```bash
php artisan route:clear
php artisan config:clear
php artisan serve
```

### Issue: Styles look broken
**Solution:**
```bash
npm run build
php artisan view:clear
```

## 🚢 Deployment Checklist

Before deploying to production:

1. ✅ Update `.env` file:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://yourdomain.com
   ```

2. ✅ Change admin credentials
   ```bash
   php artisan admin:create --email=your@email.com --password=StrongPassword123
   ```

3. ✅ Build for production
   ```bash
   npm run build
   ```

4. ✅ Optimize Laravel
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

5. ✅ Update database connection if not using SQLite

## 📚 Next Steps

1. Replace sample data with your real projects
2. Update personal information and bio
3. Add your own profile picture
4. Update social media links
5. Customize colors to match your brand
6. Add Google Analytics (optional)
7. Set up contact form notifications (email)

## 💡 Pro Tips

- **Images**: Store project images in `public/storage` and use Filament's file upload
- **Performance**: Three.js animation is optimized, but you can reduce particle count in `useThreeBackground.js` (line 27)
- **SEO**: Update meta tags in `resources/views/app.blade.php`
- **Backup**: Regularly backup your SQLite database file at `database/database.sqlite`

## 🆘 Need Help?

Check the full README.md for detailed documentation.

---

**You're all set! 🎉** Your portfolio is ready to showcase your amazing work!
