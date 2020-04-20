import React, {useRef, useState} from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import PeopleTableControls from "../people-table-controls/controls-wrapper";
import {manageHeaderVisibility} from './functions';
import './fixed-header.scss'


/**
 * Функция возвращает фиксированную шапку. Она закреплена сверху и появлзнеся если немного прокрутить страницу.
 * @return {Object} JSX компонента.
 */
function FixedHeader() {

    // В showHeader будет булево значение нужно ли отрисовать компонент.
    // По умолчанию он не отрисовывается на странице
    const [showHeader, setShowHeader] = useState(false);

    // ref на шапку
    const sectionRef = useRef(null);

    // При прокрутке запускать функцию регулирующую показ шапки.
    useScrollPosition(({ prevPos, currPos }) => {
        manageHeaderVisibility(currPos.y, showHeader, setShowHeader, sectionRef)
    });


    // Разметка компонента
    const markup = (
        <section className="fixed-header" ref={sectionRef}>
            <div className="fixed-header__inner-wrapper" ref={sectionRef}>
                <PeopleTableControls />
            </div>
        </section>
    );

    // Отрисовывать компонент в зависимости от значения showHeader.
    return showHeader ? markup : null;
}


export default FixedHeader;