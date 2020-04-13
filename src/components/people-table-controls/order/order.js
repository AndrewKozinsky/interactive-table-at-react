import React, {useCallback} from 'react';
// import styles from './Order.module.scss'
import ButtonsSection from "../buttons-section/people-controls-header";
// import PicButton from "../pic-button";
import {useDispatch, useSelector} from "react-redux";
import {changeOrder} from "../../../store/actions";
import PicButton from "../pic-button";
import {changeSearchPartOfURL} from "../../../services/URLService";
import getTexts from '../../../services/getTexts'
import textObj from './text'


function Order() {

    // Получу текущее выделенной поле
    const {order} = useSelector(state => state.peopleTableSettings);

    // Получу текущий язык
    const lang = useSelector(state => state.lang);

    // Получу тексты компонента
    let texts = getTexts(lang, textObj);

    const dispatch = useDispatch();

    // Данные для создания кнопок
    const buttonsData = [
        {
            order: 'asc',       // Как будет идти сортировка если нажать на кнопку
            title: texts.ascBtnTitle
        },
        {
            order: 'des',
            title: texts.desBtnTitle
        }
    ];

    // Обработчик нажатия на кнопку
    const clickHandler = useCallback(
        (order) => {
            dispatch(changeOrder(order));

            changeSearchPartOfURL('order', order)

        },
        [dispatch]
    );


    // Перебрать элементы массива с данными по кнопкам и вернуть массив с JSX кнопок.
    const buttons = buttonsData.map((btnData, i) => {

        // Должна ли перебираемая кнопка быть подсвеченной?
        const isDisabled = order === btnData.order;

        return (
            <PicButton
                type={btnData.order}
                click={() => clickHandler(btnData.order)}
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

export default Order;