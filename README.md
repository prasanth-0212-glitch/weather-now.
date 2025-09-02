# Weather Now

A quick weather lookup web app using **React + Vite**, **Tailwind CSS**, **Open‑Meteo**, and **OpenStreetMap Nominatim**.

## Features
- Enter a city and instantly see **temperature**, **wind speed**, **humidity**, and a **general condition**.
- Clean, responsive UI with loading and error states.
- Optional **auto‑detect** using the Geolocation API.
- No login required. No API keys needed.

## Running locally

```bash
# Install deps
npm i

# Start dev server
npm run dev
```

Open the URL shown by Vite in your browser.

## Build for production
```bash
npm run build
npm run preview
```

## Notes
- Geocoding uses Nominatim (OpenStreetMap). Please keep the default headers in `src/lib/api.js` to respect its usage policy.
- Weather uses Open‑Meteo. The app first tries the modern `current=` fields and falls back to `current_weather` + hourly humidity if needed.
- Icons are lightweight local SVGs mapped from WMO weather codes.
