import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeOrder} from "../../../store/actions";
import ButtonsSection from "../buttons-section/";
import PicButton from "../pic-button";
import {changeSearchPartOfURL} from "../../../services/URLService";
import getTexts from '../../../services/getTexts'
import textObj from './text'


/**
 * Функция возвращает группу кнопок для изменения порядка расположения данных в таблице.
 * @return {Object} JSX компонента.
 */
function Order() {

    // Получу текущее выделенной поле и порядок
    const {order} = useSelector(state => state.peopleTableSettings);

    // Получу текущий язык и подготовленные данные.
    const lang = useSelector(state => state.lang);

    const dispatch = useDispatch();

    // Сформирую тексты компонента
    let texts = getTexts(lang, textObj);


    // Данные для создания кнопок
    const buttonsData = [
        {
            order: 'asc', // Как будет идти сортировка если нажать на кнопку.
            title: texts.ascBtnTitle // title кнопки.
        },
        {
            order: 'des',
            title: texts.desBtnTitle
        }
    ];

    // Обработчик нажатия на кнопку
    const clickHandler =
        (order) => {
            // Поставить в Хранилище переданное поле сортировки таблицы.
            dispatch(changeOrder(order));

            // Изменить значение свойства order в URL.
            changeSearchPartOfURL('order', order)

        };


    // Перебрать элементы массива с данными по кнопкам и сформировать массив с JSX кнопок.
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