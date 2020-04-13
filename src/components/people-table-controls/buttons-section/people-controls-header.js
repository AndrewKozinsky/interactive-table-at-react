import React from 'react';
import styles from './ButtonsSection.module.scss'


function ButtonsSection({header, children}) {
    return (
        <div className={styles.wrapper}>
            <p className={styles.header}>{header}</p>
            {children}
        </div>
    )
}

export default ButtonsSection;