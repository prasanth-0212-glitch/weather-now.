import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import { geocodeCity, getWeather } from './lib/api.js'

export default function App() {
  const [city, setCity] = useState('')
  const [place, setPlace] = useState(null) // { name, lat, lon, country }
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Optional: Auto-detect location on first load
  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        setLoading(true)
        setError('')
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        const guessed = { name: 'Your location', lat, lon, country: '' }
        setPlace(guessed)
        const data = await getWeather(lat, lon)
        setWeather(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })
  }, [])

  const onSearch = async () => {
    if (!city.trim()) return
    try {
      setLoading(true)
      setError('')
      setWeather(null)

      const g = await geocodeCity(city.trim())
      if (!g) {
        setError('City not found')
        return
      }
      setPlace(g)

      const w = await getWeather(g.lat, g.lon)
      setWeather(w)
    } catch (e) {
      console.error(e)
      setError('Failed to fetch weather')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-xl space-y-6">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Weather Now</h1>
          <p className="text-slate-500">Quick weather lookup for any city.</p>
        </header>

        <div className="card space-y-4">
          <SearchBar
            value={city}
            onChange={setCity}
            onSearch={onSearch}
            loading={loading}
          />
          {loading && (
            <div className="text-sm text-slate-500">Fetching weather…</div>
          )}
          {error && (
            <div className="text-sm text-red-600">{error}</div>
          )}
          {weather && (
            <WeatherCard place={place} weather={weather} />
          )}
          {!loading && !weather && !error && (
            <p className="text-sm text-slate-500">
              Type a city and hit search to see current conditions.
            </p>
          )}
        </div>

        <footer className="text-center text-xs text-slate-400">
          Data from Open‑Meteo & OpenStreetMap Nominatim
        </footer>
      </div>
    </div>
  )
}
