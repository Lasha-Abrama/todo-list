import { useState } from 'react'
import './FilterDropdown.css'

const options = [
  { label: 'All', value: 'all' },
  { label: 'Complete', value: 'complete' },
  { label: 'Incomplete', value: 'incomplete' },
]

function FilterDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find((option) => option.value === value) || options[0]

  const chooseOption = (nextValue) => {
    onChange(nextValue)
    setIsOpen(false)
  }

  return (
    <div className={`filter-dropdown ${isOpen ? 'filter-dropdown--open' : ''}`} data-value={value}>
      <button
        className="filter-dropdown__trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>{selectedOption.label}</span>
      </button>

      {isOpen && (
        <ul className="filter-dropdown__menu" role="listbox" aria-label="Filter tasks">
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button type="button" onClick={() => chooseOption(option.value)}>
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FilterDropdown
