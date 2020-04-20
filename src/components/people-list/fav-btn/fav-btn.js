import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from "./FavBtn.module.scss";
import {toggleFavoriteBtn} from "../../../store/actions";
import getTexts from '../../../services/getTexts'
import textObj from './text'



/**
 * Функция возвращает кнопку добавления (удаления) в Избранное
 * @return {Object} JSX компонента.
 */
function FavBtn({data, type}) {


    // Получу текущий язык
    const [lang] = useSelector(state => [state.lang, state.people]);

    const dispatch = useDispatch();

    // Получу тексты компонента
    let texts = getTexts(lang, textObj);


    // Обработчик щелчка по кнопке
    const onBtnClick = (id) => {
        // Поставить/убрать у объекта статус нахождения в Избранном
        dispatch(toggleFavoriteBtn(id));
    };

    // Подпись у кнопки добавления в Избранное
    const title = data.favourite ? texts.titleRemove : texts.titleAdd;

    // Классы кнопки добавления в Избранное
    let classes = s.btn += ' ';
    classes += (type === 'small') ? s.btnSmall : s.btnBig;

    if(data.favourite) {
        classes += ' ';
        classes += (type === 'small') ? s.btnSmallSelected : s.btnBigSelected;
    }


    return <button className={classes} onClick={ () => onBtnClick(data.id)} title={title} />;
}


export default FavBtn;