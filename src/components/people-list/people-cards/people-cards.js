import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import infoCardCls from './InfoCard.module.scss'
import videoCardCls from './VideoCard.module.scss'
import cardsCls from './Cards.module.scss'

import {getImageAdress, getVideoAdress} from "../../../services/getMedia";
import FavBtn from "../fav-btn";

import {
    clearVideoDataArr,
    setDataObjToVideoDataArr,
    updateVideoObj,
    videoStartHandler,
    videoEndHandler,
    videoPlaybackControl,
} from "./videoControl";



/**
 * Функция возвращает компонент...
 * @return {Object} JSX компонента.
 */
function PeopleCards() {

    // Получу текущий язык и подготовленные данные.
    const [peopleDataPrepared] = useSelector(state => [state.peoplePrepared]);

    // Ссылка на обёртку рядов с карточками
    const wrapperRef = useRef(null);


    // Очистка массива videoDataArr при удалении разметки компонента.
    useEffect(() => {
        return () => clearVideoDataArr();
    }, []);


    useEffect(() => {
        // Вычислять какое видео нужно запускать, а какое останавливать...
        videoPlaybackControl();
    }, [peopleDataPrepared]);

    // При прокрутке...
    useScrollPosition(({ prevPos, currPos }) => {
        // Запущу воспроизведение подходящего видео
        videoPlaybackControl();
    });


    return (
        <div className={cardsCls.cardsWrapper} ref={wrapperRef}>
            <Cards dataArr={peopleDataPrepared} />
        </div>
    )
}


/**
 * Функция создаёт JSX карточек.
 * @param {Array} dataArr — массив с данными для формирования JSX.
 * @return {[]}
 */
function Cards({dataArr}) {

    let sections = [];

    // Переберу массив с данными для формирования разметки карточек.
    for(let i = 0; i < dataArr.length; i++) {
        let data = dataArr[i];

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

        // Разметка будет отличаться в зависимости от того есть ли в объекте данных свойство video.
        if(data.video) {
            sections.push((
                <section className={cardsCls.wideCard} key={data.id}>
                    <InfoCard data={data} />
                    <VideoCard data={data} />
                </section>
            ))

        } else {
            sections.push((
                <section className={cardsCls.dualCard} key={data.id}>
                    <InfoCard data={data} />
                    <InfoCard data={dataArr[i + 1]} />
                </section>
            ));

            // Увеличить счётчик потому что я поместил две карточки в обёртку.
            i++
        }
    }

    return sections
}


/**
 * Функция возвращает компонент карточки с информацией.
 * @return {Object} JSX компонента.
 */
function InfoCard({data}) {

    // Возможно что данные не будут переданы. Поэтому вернуть null чтобы Реакт ничего не отрисовывал.
    if(!data) return null;

    // Формирование классво карты
    let cardClasses = infoCardCls.card;
    if(data.favourite) cardClasses += ` ${infoCardCls.cardFavourite}`;

    return (
        <div className={cardClasses} data-row-id={data.id}>
            <img src={getImageAdress(data.image)} className={infoCardCls.userPic} alt={data.name} />
            <header className={infoCardCls.block1}>
                <h4 className={infoCardCls.name}>{data.name}</h4>
                <div className={infoCardCls.favSmallBtnWrapper}>
                    <FavBtn data={data} type={'small'} />
                </div>
                <p className={infoCardCls.age}>{data.age}</p>
                <p className={infoCardCls.phone}>
                    <a href={'tel:'+data.phoneHref}>{data.phone}</a>
                </p>
            </header>
            <div className={infoCardCls.block2}>
                <FavBtn data={data} type={'big'} />
            </div>
            <div className={infoCardCls.block3}>
                <p className={infoCardCls.phrase}>{data.phrase}</p>
            </div>
        </div>
    )
}


/**
 * Функция возвращает компонент карточки с видео.
 * @return {Object} JSX компонента.
 */
function VideoCard({data}) {

    // Ссылка на элемент видео.
    const videoRef = useRef(null);

    // При монтировании компонента...
    useEffect(() => {
        // Поставить обработчик на событие play у видео.
        videoRef.current.addEventListener('play', () => {
            videoStartHandler(data.id)
        });

        // Поставить обработчик на событие pause у видео.
        videoRef.current.addEventListener('ended', () => {
            videoEndHandler(data.id)
        });

        // Поставить в массив videoDataArr объект с данными о местоположении видео
        setDataObjToVideoDataArr(videoRef.current, data.id)
    }, []);


    // При прокрутке...
    useScrollPosition(({ prevPos, currPos }) => {
        // Обновить данные о положении видео
        updateVideoObj(videoRef.current, data.id)
    });


    return (
        <video className={videoCardCls.video} controls ref={videoRef} muted="muted" >
            <source src={getVideoAdress(data.video)} type="video/mp4" />
        </video>
    )
}


export default PeopleCards;