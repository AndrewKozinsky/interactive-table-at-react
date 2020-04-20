import React from 'react';
import s from './TextButton.module.scss'


/**
 * Компонент кнопки с текстом.
 * @param {String} title — текст на кнопке
 * @param {Boolean} active — выделена ли кнопка. Выделенная кнопка будет заблокированной.
 * @param {Function} click — функция запускаемая при щелчке по кнопке
 * @return {Object} JSX компонента.
 */
function TextButton({title, disabled, click, value}) {

    let classes = s.btn;

    return (
        <button className={classes} onClick={click} title={title} disabled={disabled}>
            <span className={s.textWrapper}>
                {value}
            </span>
        </button>
    )
}

export default TextButton;