import React from 'react';
import ControlsWrapper from "../people-table-controls/controls-wrapper";
import PeopleList from "../people-list/people-list";
import s from './People.module.scss'


/**
 * Функция возвращает обёртку содержащую элементы управления таблицы и саму таблицу.
 * @return {Object} JSX компонента.
 */
function People() {
    
    return (
        <section className={s.wrapper}>
            <ControlsWrapper />
            <PeopleList />
        </section>
    )
}

export default People;