import React, { useState } from 'react';
import './src/i18n.js';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';
import ExperienceList from "./components/Experience/ExperienceList";
import ContactForm from "./components/ContactForm/ContactForm";
import styles from './index.module.scss';

export default function Home() {
    const { t, i18n } = useTranslation();
    const [mousePos, setMousePos] = useState({ x: '50%', y: '0%' });
    const [selected, setSelected] = useState('about');

    const toggleLanguage = () => {
        const newLang = i18n.language === 'tr' ? 'en' : 'tr';
        i18n.changeLanguage(newLang);
    };

    function handleMouseMove(e) {
        const x = e.clientX;
        const y = e.clientY;
        setMousePos({ x: `${x}px`, y: `${y}px` });
    }

    const menuItems = [
        { key: 'about', label: t('about'),content:t('about_content') },
        { key: 'experience', label: t('experience') },
        { key: 'contact', label: t('contact') },
    ];

    const selectedItem = menuItems.find(item => item.key === selected);

    return (
        <div
            className={styles.background}
            onMouseMove={handleMouseMove}
            style={{
                '--mouse-x': mousePos.x,
                '--mouse-y': mousePos.y,
            }}
        >
            <div className={styles.languageSwitcher}>
                <button onClick={toggleLanguage}>
                    {i18n.language === 'tr' ? 'English' : 'Türkçe'}
                </button>
            </div>
            <Grid container className={styles.container}>
                <Grid item xs={6} className={styles.left}>
                    <div className={styles.avatarWrapper}>
                        <img src="/profil_elifs.jpg" alt="Profil" />
                    </div>
                    <div className={styles.name}>Elif Sena Erdoğan</div>
                    <div className={styles.job}>{t('job')}</div>
                    <div className={styles.department}>Front-End Developer</div>

                    <nav className={styles.menu}>
                        {menuItems.map(({ key, label }) => (
                            <div
                                key={key}
                                className={`${styles.menuItem} ${selected === key ? styles.active : ''}`}
                                onClick={() => setSelected(key)}
                            >
                                <span className={styles.dash}></span>
                                {label}
                            </div>
                        ))}
                    </nav>
                    <a
                        href="/elifsenaerdogancv.pdf"
                        download
                        className={styles.cvButton}
                    >
                        {t('cv_button')}
                    </a>

                    <div className={styles.socialIcons}>
                        <a href="https://github.com/elifsenaerdogan" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={24} />
                        </a>
                        <a href="https://linkedin.com/in/elifsenaerdogan" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://medium.com/@elifsenaerdogan18" target="_blank" rel="noopener noreferrer">
                            <FaMedium size={24} />
                        </a>
                    </div>
                </Grid>

                <Grid item xs={6} className={styles.right}>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={selectedItem.key}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                        >

                            <h2>{selectedItem.label}</h2>
                            {selectedItem.key === 'experience' ? (
                                <ExperienceList />
                            ) : selectedItem.key === 'contact' ? (
                                <ContactForm />
                            ) : (
                                <p style={{ whiteSpace: 'pre-line' }}>{selectedItem.content}</p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </Grid>
            </Grid>
        </div>
    );
}
