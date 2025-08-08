# Banff Store - Django Project

A Django-based store application with proper static files and template structure for Tailwind CSS or Bootstrap integration.

## Project Structure

```
banff/
├── manage.py
├── db.sqlite3
├── banff/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── views.py
│   ├── wsgi.py
│   └── asgi.py
├── templates/
│   ├── base/
│   │   └── base.html
│   ├── home.html
│   └── tailwind-example.html
└── static/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── images/
```

## Setup Instructions

1. **Navigate to the Django project directory:**
   ```bash
   cd /home/joao-marcelo/Documents/store/banffStore/banff
   ```

2. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

3. **Create a superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

4. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

5. **Visit your site:**
   - Home page: http://127.0.0.1:8000/
   - Admin panel: http://127.0.0.1:8000/admin/

## Using CSS Frameworks

### Tailwind CSS
To use Tailwind CSS, uncomment the following line in your templates:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Bootstrap
To use Bootstrap, uncomment these lines in your templates:
```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

## Custom Styling

- **CSS files:** Place your custom CSS in `static/css/`
- **JavaScript files:** Place your custom JS in `static/js/`
- **Images:** Place your images in `static/images/`

## Template Structure

- **Base template:** `templates/base/base.html` - Contains the main HTML structure
- **Home template:** `templates/home.html` - Example home page
- **Tailwind example:** `templates/tailwind-example.html` - Example using Tailwind CSS

## Static Files

The project is configured to serve static files during development. In production, you'll need to run:
```bash
python manage.py collectstatic
```

## Development Tips

1. Always extend from `base/base.html` for consistency
2. Use `{% load static %}` at the top of templates that use static files
3. Reference static files with `{% static 'path/to/file' %}`
4. The base template includes blocks for custom CSS and JavaScript
