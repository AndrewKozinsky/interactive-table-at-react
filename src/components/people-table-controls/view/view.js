import React from 'react';
import ButtonsSection from "../buttons-section";
import PicButton from "../pic-button";

import {changeSearchPartOfURL} from "../../../services/URLService";
import {useDispatch, useSelector} from "react-redux";
import {changeView} from "../../../store/actions";
import getTexts from '../../../services/getTexts'
import textObj from './text'


/**
 * Функция возвращает группу кнопок для изменения вида данных в таблице.
 * @return {Object} JSX компонента.
 */
function PeopleView() {

    // Получу вид просмотра списка людей
    const {view} = useSelector(state => state.peopleTableSettings);

    // Получу текущий язык и подготовленные данные.
    const lang = useSelector(state => state.lang);

    const dispatch = useDispatch();

    // Получу тексты компонента
    let texts = getTexts(lang, textObj);


    // Данные для создания кнопок
    const buttonsData = [
        {
            view: 'table',       // Как будет идти сортировка если нажать на кнопку
            title: texts.tableBtnTitle
        },
        {
            view: 'cards',
            title: texts.cardsBtnTitle
        }
    ];


    // Обработчик нажатия на кнопку
    const clickHandler =
        (view) => {
            dispatch(changeView(view));

            // Изменить значение свойства view в URL.
            changeSearchPartOfURL('view', view)
        };


    // Перебрать элементы массива с данными по кнопкам и вернуть массив с JSX кнопок.
    const buttons = buttonsData.map((btnData, i) => {

        // Должна ли перебираемая кнопка быть подсвеченной?
        const isDisabled = view === btnData.view;

        return (
            <PicButton
                type={btnData.view}
                click={() => clickHandler(btnData.view)}
                title={btnData.title}
                disabled={isDisabled}
                key={i}
            />
        )
    });

    return (
        <ButtonsSection header={texts.header}>
            {buttons}
        </ButtonsSection>
    )
}


export default PeopleView;