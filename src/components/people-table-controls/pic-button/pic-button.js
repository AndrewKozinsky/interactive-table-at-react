import React from 'react';
import styles from './PicButton.module.scss'


/**
 * Компонент кнопки со значком.
 * @param {String} type — тип значка на кнопке: table, cards, asc, des
 * @param {Boolean} active — выделена ли кнопка. Выделенная кнопка будет заблокированной.
 * @param {Function} click — функция запускаемая при щелчке по кнопке
 * @return {*}
 * @constructor
 */
function PicButton({type, disabled, click, title}) {

    let classes = styles.btn + ' ';

    switch (type) {
        case 'table': classes += styles['btn--table']; break;
        case 'cards': classes += styles['btn--cards']; break;
        case 'asc': classes += styles['btn--asc']; break;
        case 'des': classes += styles['btn--des']; break;
    }

    return (
        <button className={classes} onClick={click} title={title} disabled={disabled} />
    )
}

export default PicButton;