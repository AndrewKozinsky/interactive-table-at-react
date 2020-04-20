import React from 'react';
import s from './PicButton.module.scss'


/**
 * Компонент кнопки со значком.
 * @param {String} type — тип значка на кнопке: table, cards, asc, des
 * @param {Boolean} disabled — заблокирована ли кнопка.
 * @param {Function} click — функция запускаемая при щелчке по кнопке
 * @param {String} title — значение атрибута title.
 * @return {Object} JSX компонента.
 * @constructor
 */
function PicButton({type, disabled, click, title}) {

    let classes = s.btn + ' ';

    // Сформирую класс в зависимости от переданного типа кнопки
    switch (type) {
        case 'table': classes += s.btn_table; break;
        case 'cards': classes += s.btn_cards; break;
        case 'asc':   classes += s.btn_asc; break;
        case 'des':   classes += s.btn_des; break;
        default: break;
    }

    return (
        <button className={classes} onClick={click} title={title} disabled={disabled} />
    )
}

export default PicButton;