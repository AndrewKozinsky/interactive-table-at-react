import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeOrder, setPreparedPeopleData} from "../../../store/actions";
import ButtonsSection from "../buttons-section/";
import PicButton from "../pic-button";
import {changeSearchPartOfURL} from "../../../services/URLService";
import getTexts from '../../../services/getTexts'
import textObj from './text'
import {preparePeopleData} from "../../../services/preparePeopleData";


/**
 * Функция возвращает группу кнопок для изменения порядка расположения данных в таблице.
 * @return {Object} JSX компонента.
 */
function Order() {

    // Получу текущее выделенной поле и порядок
    const {sortBy, order, searchWord} = useSelector(state => state.peopleTableSettings);

    // Получу текущий язык и подготовленные данные.
    const [lang, peopleData] = useSelector(state => [state.lang, state.people]);

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

            // Приготовить данные для показа (отсортировать по текущему полю и порядку)
            let preparedData = preparePeopleData(lang, peopleData, searchWord, sortBy, order);

            // Поставить в Хранилище данные готовые для показа
            dispatch(setPreparedPeopleData(preparedData));

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