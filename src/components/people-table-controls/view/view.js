import React, {useCallback} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {changeView} from "../../store/actions";
import {changeSearchPartOfURL} from "../../../services/URLService";
import ButtonsSection from "../buttons-section/people-controls-header";
import PicButton from "../pic-button";
import {useDispatch, useSelector} from "react-redux";
import {changeView} from "../../../store/actions";
import getTexts from '../../../services/getTexts'
import textObj from './text'


function PeopleView() {


    // Получу вид просмотра списка людей
    const {view} = useSelector(state => state.peopleTableSettings);

    // Получу текущий язык
    const lang = useSelector(state => state.lang);

    // Получу тексты компонента
    let texts = getTexts(lang, textObj);

    const dispatch = useDispatch();

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
    const clickHandler = useCallback(
        (view) => {
            dispatch(changeView(view));

            changeSearchPartOfURL('view', view)

        },
        [dispatch]
    );


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