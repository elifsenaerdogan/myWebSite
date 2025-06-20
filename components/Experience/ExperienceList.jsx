import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';

export default function ExperienceList() {
    const { t } = useTranslation();

    const experiences = t('experiences', { returnObjects: true });

    return (
        <div>
            {experiences.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <ExperienceCard
                        year={exp.year}
                        title={exp.title}
                        description={exp.description}
                        tech={exp.tech}
                    />
                </motion.div>
            ))}
        </div>
    );
}
