import { SearchIcon } from '../Icons/Icons.jsx'
import './SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <div className="search__field">
        <input
          id="task-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search note..."
          aria-label="Search note"
        />
        <span className="search__icon">
          <SearchIcon />
        </span>
      </div>
    </div>
  )
}

export default SearchBar
