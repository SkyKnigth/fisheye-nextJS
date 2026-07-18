'use client';

import { useEffect, useRef, useState } from 'react';

export default function ContactModal({ photographeName, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    previousActiveElementRef.current = document.activeElement;
    firstInputRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () =>{ window.removeEventListener('keydown', handleKeyDown);
      previousActiveElementRef.current?.focus();
    };
  }, [onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Contact photographe :', photographeName);
    console.log('Prénom :', formData.firstName);
    console.log('Nom :', formData.lastName);
    console.log('Email :', formData.email);
    console.log('Message :', formData.message);
    onClose();
  };

  return (
    <div className="contact-modal-wrapper">
      <section
        ref={dialogRef}
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
      >
        <button
          type="button"
          className="contact-modal-close"
          onClick={onClose}
          aria-label="Fermer le formulaire de contact"
        >
          ×
        </button>

        <h2 id="contact-title" className="contact-modal-title">
          Contactez-moi<br />{photographeName}
        </h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName">Prénom</label>
          <input
            ref={firstInputRef}
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            required
          />

          <label htmlFor="lastName">Nom</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="message">Votre message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="contact-submit">
            Envoyer
          </button>
        </form>
      </section>
    </div>
  );
}