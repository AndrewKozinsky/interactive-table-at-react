import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import s from "./FavBtn.module.scss";
import {toggleFavoriteBtn} from "../../../store/actions";


function SmallFavBtn({data}) {

    // Подпись у кнопки добавления в Избранное
    const title = data.favourite ? "Убрать из Избранного" : "Добавить в Избранное";

    // Классы кнопки добавления в Избранное
    let classes = `${s.btn}  ${s.btnSmall}`;
    if(data.favourite) classes += ` ${s.btnSmallSelected}`;


    return <button className={classes} title={title} />;
}


function BigFavBtn({data}) {

    const dispatch = useDispatch();

    const onBtnClick = useCallback((id) => {
        dispatch(toggleFavoriteBtn(id))
    }, [dispatch]);

    // Подпись у кнопки добавления в Избранное
    const title = data.favourite ? "Убрать из Избранного" : "Добавить в Избранное";

    // Классы кнопки добавления в Избранное
    let classes = `${s.btn}  ${s.btnBig}`;
    if(data.favourite) classes += ` ${s.btnBigSelected}`;

    return <button className={classes} onClick={ () => onBtnClick(data.id)} title={title} />;
}

export {
    SmallFavBtn,
    BigFavBtn
};