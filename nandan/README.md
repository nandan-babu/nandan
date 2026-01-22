# Nandan Babu - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## Deployment on Vercel

This is a static website. To deploy on Vercel:

1. Push this repository to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect it as a static site
4. Deploy!

**Important:** Make sure the Root Directory in Vercel project settings is set to `/` (root of the repository).

## File Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript
├── vercel.json         # Vercel configuration
└── portfolio/
    └── public/
        └── assets/     # Images, CV, etc.
```

## Local Development

Simply open `index.html` in a web browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then visit `http://localhost:8000`
