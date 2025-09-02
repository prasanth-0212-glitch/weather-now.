export default function SearchBar({ value, onChange, onSearch, loading }) {
  const handleKey = (e) => {
    if (e.key === 'Enter') onSearch()
  }
  return (
    <div className="flex gap-2">
      <input
        className="input"
        type="text"
        placeholder="Enter city (e.g., Tokyo)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        aria-label="City name"
      />
      <button className="btn shrink-0" onClick={onSearch} disabled={loading}>
        {loading ? 'Searching…' : 'Search'}
      </button>
    </div>
  )
}
