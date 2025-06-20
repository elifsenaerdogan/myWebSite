import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ContactForm.module.scss';

export default function ContactForm() {
    const { t } = useTranslation();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('https://formspree.io/f/xyzjdyen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            setSubmitted(true);
            setForm({ name: '', email: '', message: '' });
        } else {
            alert(t('contact_error'));
        }
    };

    if (submitted) {
        return <p className={styles.success}>{t('contact_thank_you')}</p>;
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder={t('contact_name')}
                value={form.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder={t('contact_email')}
                value={form.email}
                onChange={handleChange}
                required
            />
            <textarea
                name="message"
                placeholder={t('contact_message')}
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
            />
            <button type="submit">{t('contact_submit')}</button>
        </form>
    );
}
