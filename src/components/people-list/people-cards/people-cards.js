import React, {useEffect, useRef} from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import infoCardCls from './InfoCard.module.scss'
import videoCardCls from './VideoCard.module.scss'
import cardsCls from './Cards.module.scss'

import {getImageAdress, getVideoAdress} from "../../../services/getMedia";
import {SmallFavBtn, BigFavBtn} from "../fav-btn";
import {
    clearVideoDataArr,
    setDataObjToVideoDataArr,
    updateVideoObj, videoEndHandler,
    videoPlaybackControl,
    videoStartHandler
} from "./videoControl";




function PeopleCards({dataArr}) {

    // Очистка массива videoDataArr при удалении разметки компонента.
    useEffect(() => {
        return () => clearVideoDataArr();
    }, []);

    // При прокрутке...
    useEffect(() => {
        // Вычислять какое видео нужно запускать, а какое останавливать...
        videoPlaybackControl()
    }, []);


    useScrollPosition(({ prevPos, currPos }) => {
        // Запущу воспроизведение подходящего видео
        // console.log(55);
        videoPlaybackControl()
    });

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

    const cards = createCards(dataArr);

    return (
        <div className={cardsCls.cardsWrapper}>
            {cards}
        </div>
    )
}



function createCards(dataArr) {

    let sections = [];

    for(let i = 0; i < dataArr.length; i++) {
        let data = dataArr[i];


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

            i++
        }
    }

    return sections
}


function InfoCard({data}) {

    if(!data) return null;


    let cardClasses = infoCardCls.card;
    if(data.favourite) cardClasses += ` ${infoCardCls.cardFavourite}`;

    return (
        <div className={cardClasses}>
            <img src={getImageAdress(data.image)} className={infoCardCls.userPic} />
            <header className={infoCardCls.block1}>
                <h4 className={infoCardCls.name}>{data.name}</h4>
                <div className={infoCardCls.favSmallBtnWrapper}>
                    <SmallFavBtn data={data} />
                </div>
                <p className={infoCardCls.age}>{data.age}</p>
                <p className={infoCardCls.phone}>
                    <a href={'tel:'+data.phoneHref}>{data.phone}</a>
                </p>
            </header>
            <div className={infoCardCls.block2}>
                <BigFavBtn data={data} />
            </div>
            <div className={infoCardCls.block3}>
                <p className={infoCardCls.phrase}>{data.phrase}</p>
            </div>
        </div>
    )
}


function VideoCard({data}) {

    const videoRef = useRef(null);

    // При монтировании компонента...
    useEffect(() => {
        // Поставить в массив videoDataArr объект с данными о местоположении видео
        setDataObjToVideoDataArr(videoRef.current, data.id)
    }, []);


    // При прокрутке...
    useScrollPosition(({ prevPos, currPos }) => {
        // Обновить данные о положении видео
        updateVideoObj(videoRef.current, data.id)
    });


    useEffect(() => {
        videoRef.current.addEventListener('play', () => {
            videoStartHandler(data.id)
        });

        videoRef.current.addEventListener('ended', () => {
            videoEndHandler(data.id)
        });

    }, []);



    return (
        <video className={videoCardCls.video} controls ref={videoRef} >
            <source src={getVideoAdress(data.video)} type="video/mp4" />
        </video>
    )
}


export default PeopleCards;