import React, {useCallback} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {changeView} from "../../store/actions";
import {changeSearchPartOfURL} from "../../../services/URLService";
// import styles from './View.module.scss'
import ButtonsSection from "../buttons-section/people-controls-header";
import PicButton from "../pic-button";
import {useDispatch, useSelector} from "react-redux";
import {changeView} from "../../../store/actions";


function PeopleView() {


    // Получу вид просмотра списка людей
    const {view} = useSelector(state => state.peopleTableSettings);

    const dispatch = useDispatch();

    // Данные для создания кнопок
    const buttonsData = [
        {
            view: 'table',       // Как будет идти сортировка если нажать на кнопку
        },
        {
            view: 'cards',
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
                disabled={isDisabled}
                key={i}
            />
        )
    });

    return (
        <ButtonsSection header="Вид:">
            {buttons}
        </ButtonsSection>
    )
}


export default PeopleView;