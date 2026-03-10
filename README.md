# Modern Portfolio Website

A stunning, modern portfolio website built with Laravel, Vue.js, Tailwind CSS, Three.js animations, and Filament PHP admin panel.

## Features

- ✨ **Modern SPA Architecture** - Built with Inertia.js and Vue.js for seamless page transitions
- 🎨 **Beautiful UI/UX** - Designed with Tailwind CSS for a modern, responsive design
- 🌌 **Three.js Animations** - Interactive 3D particle background animation
- 🔐 **Admin Panel** - Powered by Filament PHP for easy content management
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🚀 **Performance Optimized** - Fast loading times and smooth animations
- 📧 **Contact Form** - Built-in contact form with database storage

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: Vue.js 3, Inertia.js
- **Styling**: Tailwind CSS
- **Animation**: Three.js
- **Admin Panel**: Filament PHP 3
- **Database**: SQLite (can be changed to MySQL/PostgreSQL)

## Installation

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18 or higher
- NPM

### Steps

1. **Clone the repository**
   ```bash
   cd portfolio-app
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Set up environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure database**
   
   The project uses SQLite by default. The database file is created automatically at `database/database.sqlite`.
   
   If you prefer MySQL or PostgreSQL, update the `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=portfolio
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Create an admin user**
   ```bash
   php artisan admin:create --email=admin@example.com --password=password --name="Admin User"
   ```

8. **Build frontend assets**
   ```bash
   npm run build
   ```

9. **Start the development server**
   ```bash
   php artisan serve
   ```

   For development with hot reload:
   ```bash
   # Terminal 1
   php artisan serve
   
   # Terminal 2
   npm run dev
   ```

## Usage

### Accessing the Website

- **Portfolio Website**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin

### Admin Panel

Log in with the credentials you created:
- Email: admin@example.com
- Password: password

From the admin panel, you can manage:

1. **Projects** - Add your portfolio projects with:
   - Title and description
   - Technologies used
   - GitHub and live demo URLs
   - Featured status
   - Images

2. **Skills** - Showcase your technical skills with:
   - Skill name and category
   - Proficiency level (0-100%)
   - Custom icons

3. **Experience** - Add your work experience:
   - Company and position
   - Duration (start date, end date, or current)
   - Location
   - Description

4. **Contacts** - View messages submitted through the contact form

### Customization

#### Update Personal Information

Edit the following files to customize your portfolio:

1. **Hero Section** - `resources/js/Components/Portfolio/HeroSection.vue`
   - Update name, titles, and bio

2. **About Section** - `resources/js/Components/Portfolio/AboutSection.vue`
   - Update your personal story

3. **Social Links** - Update in both:
   - `resources/js/Components/Portfolio/HeroSection.vue`
   - `resources/js/Components/Portfolio/Footer.vue`

4. **Three.js Animation** - `resources/js/Composables/useThreeBackground.js`
   - Customize particle count, colors, and animation speed

#### Styling

All Tailwind CSS classes can be customized. The color scheme uses:
- Primary: Indigo (indigo-500)
- Secondary: Purple (purple-600)
- Background: Gray-900

To change colors, update the classes throughout the Vue components.

### Adding Content

#### Add Projects

1. Go to Admin Panel → Projects
2. Click "New Project"
3. Fill in:
   - Title
   - Description
   - Technologies (as JSON array: ["Laravel", "Vue.js", "Tailwind"])
   - GitHub URL (optional)
   - Live URL (optional)
   - Upload image (optional)
   - Set featured status
   - Set order for sorting

#### Add Skills

1. Go to Admin Panel → Skills
2. Click "New Skill"
3. Fill in:
   - Name (e.g., "Laravel")
   - Category (e.g., "Backend", "Frontend", "Tools")
   - Proficiency (0-100)
   - Order for sorting

#### Add Experience

1. Go to Admin Panel → Experiences
2. Click "New Experience"
3. Fill in:
   - Company name
   - Position
   - Description
   - Start date
   - End date (or check "Is Current")
   - Location (optional)
   - Company URL (optional)

### Deployment

#### Production Build

```bash
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### Environment Variables

Make sure to update these in production:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
```

#### Web Server Configuration

**Apache (.htaccess)** - Already included in Laravel

**Nginx** - Add to your server block:
```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

## Folder Structure

```
portfolio-app/
├── app/
│   ├── Filament/         # Filament admin resources
│   ├── Http/Controllers/ # Controllers including PortfolioController
│   └── Models/           # Eloquent models (Project, Skill, Experience, Contact)
├── database/
│   └── migrations/       # Database migrations
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   └── Portfolio/    # Vue components
│   │   ├── Composables/       # Reusable Vue composables
│   │   └── Pages/
│   │       └── Portfolio/     # Main portfolio page
│   └── css/
│       └── app.css           # Tailwind CSS
├── routes/
│   └── web.php              # Web routes
└── public/                  # Public assets
```

## Troubleshooting

### Three.js not loading
- Clear browser cache
- Rebuild assets: `npm run build`

### Vite errors during npm install
- Use `--legacy-peer-deps` flag: `npm install --legacy-peer-deps`

### Admin panel not accessible
- Clear cache: `php artisan cache:clear`
- Check if user exists: `php artisan tinker` then `User::all()`

### Styling issues
- Rebuild Tailwind: `npm run build`
- Clear view cache: `php artisan view:clear`

## Contributing

This is a portfolio template. Feel free to fork and customize it for your own use!

## License

Open-source software. Use it as you wish!

## Support

For issues or questions, please open an issue on the repository.

---

**Built with ❤️ using Laravel, Vue.js, Tailwind CSS, and Three.js**
# Portfolio
