// Minimal mapping of WMO weather codes to text + local icon paths
export function codeToText(code) {
  const m = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Freezing drizzle (light)',
    57: 'Freezing drizzle (dense)',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Freezing rain (light)',
    67: 'Freezing rain (heavy)',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Rain showers (slight)',
    81: 'Rain showers (moderate)',
    82: 'Rain showers (violent)',
    85: 'Snow showers (slight)',
    86: 'Snow showers (heavy)',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  }
  return m[code] ?? 'Unknown'
}

export function codeToIcon(code) {
  // Very small set of clean SVG icons
  if (code === 0) return '/icons/sun.svg'
  if ([1,2].includes(code)) return '/icons/partly.svg'
  if (code === 3) return '/icons/cloud.svg'
  if ([45,48].includes(code)) return '/icons/fog.svg'
  if ([51,53,55,56,57].includes(code)) return '/icons/drizzle.svg'
  if ([61,63,65,66,67,80,81,82].includes(code)) return '/icons/rain.svg'
  if ([71,73,75,77,85,86].includes(code)) return '/icons/snow.svg'
  if ([95,96,99].includes(code)) return '/icons/thunder.svg'
  return '/icons/cloud.svg'
}
