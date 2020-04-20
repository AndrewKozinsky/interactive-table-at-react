import React from 'react';
import ButtonsSection from "../buttons-section";
import TextButton from "../text-button";

import {useDispatch, useSelector} from "react-redux";
import {
    sortByField
} from '../../../store/actions'
import {changeSearchPartOfURL} from '../../../services/URLService'

import getTexts from '../../../services/getTexts'
import textObj from './text'


/**
 * Функция возвращает группу кнопок для изменения сортировки данных в таблице.
 * @return {Object} — JSX с кнопками сортировки
 */
function Sorting() {

    // Получу текущее выделенной поле, порядок и искомое слово
    const {sortBy} = useSelector(state => state.peopleTableSettings);

    // Получу текущий язык и подготовленные данные.
    const [lang] = useSelector(state => [state.lang]);

    const dispatch = useDispatch();


    // Получу тексты компонента
    let texts = getTexts(lang, textObj);

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
    const clickHandler = (field) => {

        // Поменять в Хранилище поле по которому сортируются данные.
        dispatch(sortByField(field));

        // Изменить значение свойства sortBy в URL.
        changeSearchPartOfURL('sortBy', field);
    };


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