import { codeToIcon, codeToText } from '../lib/wmo.js'

export default function WeatherCard({ place, weather }) {
  const { temperature, windspeed, humidity, code } = weather
  const icon = codeToIcon(code)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
      <div className="sm:col-span-2 flex items-center gap-4">
        <img src={icon} alt={codeToText(code)} className="w-16 h-16" />
        <div>
          <h2 className="text-xl font-semibold">
            {place?.name}
            {place?.country ? `, ${place.country}` : ''}
          </h2>
          <div className="text-slate-500 text-sm">
            {codeToText(code)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 text-center">
        <div className="card p-4">
          <div className="text-xs text-slate-500">Temperature</div>
          <div className="text-2xl font-bold">
            {Math.round(temperature)}°C
          </div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-slate-500">Wind</div>
          <div className="text-2xl font-bold">
            {Math.round(windspeed)} km/h
          </div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-slate-500">Humidity</div>
          <div className="text-2xl font-bold">
            {Math.round(humidity)}%
          </div>
        </div>
      </div>
    </div>
  )
}
