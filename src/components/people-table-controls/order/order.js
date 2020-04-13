import React, {useCallback} from 'react';
// import styles from './Order.module.scss'
import ButtonsSection from "../buttons-section/people-controls-header";
// import PicButton from "../pic-button";
import {useDispatch, useSelector} from "react-redux";
import {changeOrder} from "../../../store/actions";
import PicButton from "../pic-button";
import {changeSearchPartOfURL} from "../../../services/URLService";


function Order() {

    // Получу текущее выделенной поле
    const {order} = useSelector(state => state.peopleTableSettings);

    const dispatch = useDispatch();

    // Данные для создания кнопок
    const buttonsData = [
        {
            order: 'asc',       // Как будет идти сортировка если нажать на кнопку
        },
        {
            order: 'des',
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
                disabled={isDisabled}
                key={i}
            />
        )
    });

    return (
        <ButtonsSection header="Порядок:">
            {buttons}
        </ButtonsSection>
    )
}

export default Order;