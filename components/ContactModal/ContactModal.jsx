'use client';

import { useEffect, useState } from 'react';

export default function ContactModal({ photographeName, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
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
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />

          <label htmlFor="lastName">Nom</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="message">Votre message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit" className="contact-submit">
            Envoyer
          </button>
        </form>
      </section>
    </div>
  );
}
