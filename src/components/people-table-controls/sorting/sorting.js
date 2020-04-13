import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {sortByField} from '../../../store/actions'
import {changeSearchPartOfURL} from '../../../services/URLService'
import ButtonsSection from "../buttons-section/people-controls-header";
import TextButton from "../text-button";


/**
 * Функция создаёт кнопки сортировки списка по полю
 * @return {Object} — JSX с кнопками сортировки
 */
function Sorting() {

    // Получу текущее выделенной поле
    const {sortBy} = useSelector(state => state.peopleTableSettings);

    const dispatch = useDispatch();

    // Данные для создания кнопок
    const buttonsData = [
        {
            btnName: 'ID',  // Текст на кнопке
            fieldName: 'id' // По какому полю будет идти сортировка если нажать на кнопку
        },
        {
            btnName: 'Имя',
            fieldName: 'name'
        },
        {
            btnName: 'Возраст',
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
                title={btnData.btnName}
                disabled={isDisabled}
                key={i}
            />
        )
    });

    return (
        <ButtonsSection header="Сортировка:">
            {buttons}
        </ButtonsSection>
    )
}



export default Sorting;