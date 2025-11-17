# Lawbot Frontend

React + Vite single-page app that must run under `http://localhost/lawbot/index.html` in XAMPP.

## Develop

1. `npm install`
2. `npm run dev`
3. Open the printed Vite URL (defaults to `http://localhost:5173`).

## Build for Apache/XAMPP

1. `npm run build` – outputs static assets to `dist/` with paths rooted at `/lawbot/`.
2. Copy the entire `dist` folder into `C:\xampp\htdocs\lawbot` (create the directory if needed).
3. Start Apache in the XAMPP Control Panel.
4. Visit `http://localhost/lawbot/index.html`. BrowserRouter handles navigation (e.g., `http://localhost/lawbot/index.html/login`) thanks to the `.htaccess` file included in `public/`.

> If your XAMPP installation lives somewhere else, adjust the target folder accordingly. No additional Apache configuration is required so long as `.htaccess` overrides are enabled (default in XAMPP).
