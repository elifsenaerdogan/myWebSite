import React from 'react';
import styles from './experience.module.scss';

export default function ExperienceCard({ year, title, description, tech }) {
    return (
        <div className={styles.experienceCard}>
            <div className={styles.experienceYear}>{year}</div>
            <div className={styles.experienceTitle}>{title}</div>
            <div className={styles.experienceDesc}>{description}</div>
            <div className={styles.techStack}>
                {tech.map((item, idx) => (
                    <span key={idx}>{item}</span>
                ))}
            </div>
        </div>
    );
}
