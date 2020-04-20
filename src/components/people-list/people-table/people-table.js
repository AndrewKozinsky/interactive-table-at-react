import React, {shallowEqual, useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import FavBtn from '../fav-btn';
import s from './PeopleTable.module.scss'
import {getImageAdress} from "../../../services/getMedia";
import {
    createRowsPositionMap,
    setNewTopToRowsPositionMap,
    setCorrelationTopCoord,
    setTranslateY,
    setTransitionStyleToZero,
    clearTransformStyle,
    clearStyle
} from "./function";




/**
 * Функция возвращает компонент...
 * @return {Object} JSX компонента.
 */
function PeopleTable() {

    // Свойство needToUpdate необходимо чтобы спровоцировать перерисовку компонента при необходимост.
    let [needToUpdate, setNeedToUpdate] = useState(1);

    // Получу искомое слово
    const {searchWord} = useSelector(state => state.peopleTableSettings);

    // Получу текущий язык и подготовленные данные.
    const [lang, peopleDataPrepared] = useSelector(state => [state.lang, state.peoplePrepared], shallowEqual);

    const wrapperRef = useRef(null);


    // Этот useEffect срабатывает при изменеии peopleDataPrepared.
    // В этом свойстве хранится новый порядок расположения рядов.
    useEffect(() => {

        // Все операции ниже требуются чтобы при изменении peopleDataPrepared
        // плавно перенести существующий ряд на новое место показав как именно происходит сортировка.

        // Переберу ряды и получу высоту, id данных и расстояние до верха. Положу эти данные в объект, а объекты в массив rowsPositionsMap.
        // В rowsPositionsMap будет массив вида: [ {id: 120, height: 54, top: 0}, {id: 41, height: 54, top: 64} ]
        const rowsPositionsMap = createRowsPositionMap(wrapperRef.current);


        // На основе данных из peopleDataPrepared вычислить на какой высоте должны располагаться ряды после сортировки.
        // В rowsPositionsMap будет массив вида: [ {id: 120, height: 54, top: 0, newTop: 6528}, {id: 79, height: 54, top: 64, newTop: 3648} ]
        setNewTopToRowsPositionMap(peopleDataPrepared, rowsPositionsMap);


        // Поставить значение корректирующей координаты
        // В rowsPositionsMap будет массив вида: [ {id: 120, height: 54, top: 0, newTop: 6528, correlationTop: 6528}, {id: 41, height: 54, top: 64, newTop: 9536, correlationTop: 9472} ]
        setCorrelationTopCoord(rowsPositionsMap);

        // Поставить transform: translateY() в style. Это приведёт к тому, что ряды плавно переместятся на новое место.
        setTranslateY(wrapperRef.current, rowsPositionsMap);


        // Как только анимация завершится...
        setTimeout(() => {

            // Поставить свойство transition в transform 0s
            // потому что дальше свойство transform будет изменено и я не хочу чтобы оно изменялось плавно.
            setTransitionStyleToZero(wrapperRef.current);

            // Изменение transition требует время, поэтому выполню код ниже через setTimeout
            setTimeout(() => {

                // Убрать у рядов свойство transform в style потому что сцена будет перерисована под новые настройки показа рядов.
                // Установленный transform будет искажать положение элементов
                clearTransformStyle(wrapperRef.current);

                // Поставить случайное число в needToUpdate, которое является Состоянием, чтобы спровоцировать перерисовку рядов таблицы.
                setNeedToUpdate(Math.random());

                // Как все манипуляции будут выполнены...
                setTimeout(() => {
                    // ... тогда полностью очистить style всех рядов.
                    clearStyle(wrapperRef.current);
                }, 0);

            }, 0);

        }, 1000);

    }, [peopleDataPrepared]);



    // Создать разметку рядов.
    const rows = peopleDataPrepared.map(data => {
        return <Row data={data} key={data.id} />
    });

    return useMemo(() => {
        return (
            <section className={s.rowsWrapper} ref={wrapperRef}>
                {rows}
            </section>
        )
    }, [lang, searchWord, needToUpdate])
}


/**
 * Функция возвращает компонент...
 * @return {Object} JSX компонента.
 */
function Row({data}) {

    /*
    В data будет объект со свойствами:
        "id": 0,
        "favourite": false,
        "name": "Gilbert Morton",
        "age": 30,
        "phone": "(369) 432-9206",
        "image": "sheep",
        "phrase": "Japman somam mes lizmasapa om zefopi ki wa ogju mofrajnir denba uc famoso opeipu woul.",
        "video": "shoe"
    * */


    let rowClasses = s.row;
    if(data.favourite) rowClasses += ` ${s.rowFavourite}`;


    return (
        <div className={rowClasses} data-row-id={data.id}>
            <img src={getImageAdress(data.image)} className={s.userPic} alt={data.name} />
            <div className={s.leftPart}>
                <h4 className={s.name}>{data.name}</h4>
                <div className={s.favSmallBtnWrapper}>
                    <FavBtn data={data} type={'small'} />
                </div>
                <p className={s.age}>{data.age}</p>
                <p className={s.phone}>
                    <a href={'tel:'+data.phoneHref}>{data.phone}</a>
                </p>
            </div>
            <div className={s.rightPart}>
                <FavBtn data={data} type={'big'} />
            </div>
        </div>
    )
}



export default PeopleTable;