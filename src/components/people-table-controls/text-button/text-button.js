import React from 'react';
import styles from './TextButton.module.scss'


/**
 * Компонент кнопки с текстом.
 * @param {String} title — текст на кнопке
 * @param {Boolean} active — выделена ли кнопка. Выделенная кнопка будет заблокированной.
 * @param {Function} click — функция запускаемая при щелчке по кнопке
 * @return {*}
 * @constructor
 */
function TextButton({title, disabled, click, value}) {

    let classes = styles.btn;

    return (
        <button className={classes} onClick={click} title={title} disabled={disabled}>
            <span className={styles['text-wrapper']}>
                {value}
            </span>
        </button>
    )
}

export default TextButton;