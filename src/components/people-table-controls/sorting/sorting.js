import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {sortByField} from '../../../store/actions'
import {changeSearchPartOfURL} from '../../../services/URLService'
import ButtonsSection from "../buttons-section/people-controls-header";
import TextButton from "../text-button";
import getTexts from '../../../services/getTexts'
import textObj from './text'


/**
 * Функция создаёт кнопки сортировки списка по полю
 * @return {Object} — JSX с кнопками сортировки
 */
function Sorting() {

    // Получу текущее выделенной поле
    const {sortBy} = useSelector(state => state.peopleTableSettings);

    // Получу текущий язык
    const lang = useSelector(state => state.lang);

    // Получу тексты компонента
    let texts = getTexts(lang, textObj);

    const dispatch = useDispatch();

    // Данные для создания кнопок
    const buttonsData = [
        {
            value: texts.idBtnValue,  // Текст на кнопке
            title: texts.idBtnTitle,  // Подсказка кнопки
            fieldName: 'id', // По какому полю будет идти сортировка если нажать на кнопку
        },
        {
            value: texts.nameBtnValue,
            title: texts.nameBtnTitle,
            fieldName: 'name'
        },
        {
            value: texts.ageBtnValue,
            title: texts.ageBtnTitle,
            fieldName: 'age'
        },
    ];

    // Обработчик нажатия на кнопку
    const clickHandler = useCallback(
        (field) => {
            dispatch(sortByField(field));

            changeSearchPartOfURL('sortBy', field)
        },
        [dispatch]
    );


    // Перебрать элементы массива с данными по кнопкам и вернуть массив с JSX кнопок.
    const buttons = buttonsData.map((btnData, i) => {

        // Должна ли перебираемая кнопка быть подсвеченной?
        const isDisabled = sortBy === btnData.fieldName;

        return (
            <TextButton
                click={() => clickHandler(btnData.fieldName)}
                value={btnData.value}
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



export default Sorting;