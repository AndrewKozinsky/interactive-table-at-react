import React from 'react';
import s from './ButtonsSection.module.scss'


/**
 * Функция возвращает обёртку с группой кнопок и заголовком.
 * @return {Object} JSX компонента.
 */
function ButtonsSection({header, children}) {
    return (
        <div className={s.wrapper}>
            <p className={s.header}>{header}</p>
            {children}
        </div>
    )
}

export default ButtonsSection;