'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function SortSelect({ sortType, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'popularity', label: 'Popularité' },
    { value: 'date', label: 'Date' },
    { value: 'title', label: 'Titre' },
  ];
  // Récupère filtre sélectionné.

  const selectedOption = options.find((option) => option.value === sortType);

  // Met à jour le tri puis referme le menu.

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="sort-select">
      <span className="sort-select-label">Trier par</span>

      <div className="sort-select-menu">
        <button
          type="button"
          className={`sort-select-button ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedOption.label}

          <FontAwesomeIcon
            icon={faAngleDown}
            className={`sort-select-icon ${isOpen ? 'open' : ''}`}
          />
        </button>

        {isOpen && (
          <ul className="sort-select-options" role="listbox">
            {options
              .filter((option) => option.value !== sortType)
              .map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className="sort-select-option"
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}