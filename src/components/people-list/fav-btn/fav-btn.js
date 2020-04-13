import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from "./FavBtn.module.scss";
import {toggleFavoriteBtn} from "../../../store/actions";
import getTexts from '../../../services/getTexts'
import textObj from './text'


function SmallFavBtn({data}) {

    // Получу текущий язык
    const lang = useSelector(state => state.lang);

    // Получу тексты компонента
    let texts = getTexts(lang, textObj);

    const dispatch = useDispatch();

    const onBtnClick = useCallback((id) => {
        dispatch(toggleFavoriteBtn(id))
    }, [dispatch]);

    // Подпись у кнопки добавления в Избранное
    // const title = data.favourite ? "Убрать из Избранного" : "Добавить в Избранное";
    const title = data.favourite ? texts.titleRemove : texts.titleAdd;

    // Классы кнопки добавления в Избранное
    let classes = `${s.btn}  ${s.btnSmall}`;
    if(data.favourite) classes += ` ${s.btnSmallSelected}`;


    return <button className={classes} onClick={ () => onBtnClick(data.id)} title={title} />;
}


function BigFavBtn({data}) {

    // Получу текущий язык
    const lang = useSelector(state => state.lang);

    // Получу тексты компонента
    let texts = getTexts(lang, textObj);

    const dispatch = useDispatch();

    const onBtnClick = useCallback((id) => {
        dispatch(toggleFavoriteBtn(id))
    }, [dispatch]);

    // Подпись у кнопки добавления в Избранное
    const title = data.favourite ? texts.titleRemove : texts.titleAdd;

    // Классы кнопки добавления в Избранное
    let classes = `${s.btn}  ${s.btnBig}`;
    if(data.favourite) classes += ` ${s.btnBigSelected}`;

    return <button className={classes} onClick={ () => onBtnClick(data.id)} title={title} />;
}

export {
    SmallFavBtn,
    BigFavBtn
};