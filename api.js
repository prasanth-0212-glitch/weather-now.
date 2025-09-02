// API helpers for geocoding (Nominatim) and weather (Open‑Meteo)
const NOMINATIM = 'https://nominatim.openstreetmap.org/search'
const OM = 'https://api.open-meteo.com/v1/forecast'

export async function geocodeCity(query) {
  const url = new URL(NOMINATIM)
  url.searchParams.set('q', query)
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', '1')
  const res = await fetch(url, {
    headers: {
      // Per Nominatim usage policy, set a descriptive UA & referrer
      'User-Agent': 'WeatherNowApp/1.0 (contact: example@example.com)',
      'Accept-Language': 'en',
      'Referer': location.origin
    }
  })
  if (!res.ok) throw new Error('Geocoding failed')
  const data = await res.json()
  if (!data || data.length === 0) return null
  const d = data[0]
  return {
    name: d.display_name.split(',')[0],
    lat: parseFloat(d.lat),
    lon: parseFloat(d.lon),
    country: (d.address && (d.address.country_code?.toUpperCase() || d.address.country)) || ''
  }
}

// Try "current=" fields first (newer API). Fallback to current_weather + hourly RH if needed.
export async function getWeather(lat, lon) {
  const url = new URL(OM)
  url.searchParams.set('latitude', lat)
  url.searchParams.set('longitude', lon)
  url.searchParams.set('timezone', 'auto')
  url.searchParams.set('current', 'temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code')
  let res = await fetch(url)
  if (res.ok) {
    const j = await res.json()
    if (j.current) {
      return {
        temperature: j.current.temperature_2m,
        windspeed: j.current.wind_speed_10m,
        humidity: j.current.relative_humidity_2m,
        code: j.current.weather_code
      }
    }
  }

  // Fallback for older schema
  const fallback = new URL(OM)
  fallback.searchParams.set('latitude', lat)
  fallback.searchParams.set('longitude', lon)
  fallback.searchParams.set('timezone', 'auto')
  fallback.searchParams.set('current_weather', 'true')
  fallback.searchParams.set('hourly', 'relativehumidity_2m')
  res = await fetch(fallback)
  if (!res.ok) throw new Error('Weather fetch failed')
  const j = await res.json()
  const cw = j.current_weather
  let humidity = null
  try {
    // get humidity for closest hour to current_weather.time
    const idx = j.hourly.time.indexOf(cw.time)
    humidity = idx >= 0 ? j.hourly.relativehumidity_2m[idx] : j.hourly.relativehumidity_2m[0]
  } catch {}
  return {
    temperature: cw.temperature,
    windspeed: cw.windspeed,
    humidity: humidity ?? 0,
    code: cw.weathercode
  }
}
