import React from 'react';
import Sorting from "../sorting";
import View from "../view";
import Order from "../order";
import Search from "../search";
import s from './ControlsWrapper.module.scss'


/**
 * Функция возвращает обёртку для элементов управления данными таблицы.
 * @return {Object} JSX компонента.
 */
function ControlsWrapper() {

    return (
        <div className={s.wrapper}>
            <div className={s.block_1}>
                <Sorting />
            </div>

            <div className={s.block_2}>
                <View />
                <Order />
            </div>

            <div className={s.block_3}>
                <Search />
            </div>
        </div>
    )
}


export default ControlsWrapper;