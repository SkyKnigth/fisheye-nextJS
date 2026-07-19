'use client';

import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function SortSelect({ sortType, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const buttonRef = useRef(null);
  const optionRefs = useRef([]);

  const options = [
    { value: 'popularity', label: 'Popularité' },
    { value: 'date', label: 'Date' },
    { value: 'title', label: 'Titre' },
  ];

  const selectedOption = options.find((option) => option.value === sortType);

  const availableOptions = options.filter((option) => option.value !== sortType);

  const openMenu = () => {
    setFocusedIndex(0);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleSelect = (value) => {
    onChange(value);
    closeMenu();
  };

  const handleButtonKeyDown = (event) => {
    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'ArrowDown'
    ) {
      event.preventDefault();
      openMenu();
    }
  };

  const handleOptionKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      setFocusedIndex((index) => {
        if (event.shiftKey) {
          return index === 0
            ? availableOptions.length - 1
            : index - 1;
        }

        return index === availableOptions.length - 1
          ? 0
          : index + 1;
      });

      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      setFocusedIndex((index) =>
        index === availableOptions.length - 1 ? 0 : index + 1
      );
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      setFocusedIndex((index) =>
        index === 0 ? availableOptions.length - 1 : index - 1
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex, isOpen]);

  return (
    <div className="sort-select">
      <span className="sort-select-label">Trier par</span>

      <div className="sort-select-menu">
        <button
          ref={buttonRef}
          type="button"
          className={`sort-select-button ${isOpen ? 'open' : ''}`}
          onClick={() => {
            if (isOpen) {
              closeMenu();
            } else {
              openMenu();
            }
          }}
          onKeyDown={handleButtonKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Trier les médias par ${selectedOption.label}`}
        >
          {selectedOption.label}

          <FontAwesomeIcon
            icon={faAngleDown}
            className={`sort-select-icon ${isOpen ? 'open' : ''}`}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <ul
            className="sort-select-options"
            role="listbox"
            aria-label="Options de tri"
          >
            {availableOptions.map((option, index) => (
              <li key={option.value}>
                <button
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  className="sort-select-option"
                  role="option"
                  aria-selected="false"
                  onClick={() => handleSelect(option.value)}
                  onKeyDown={handleOptionKeyDown}
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