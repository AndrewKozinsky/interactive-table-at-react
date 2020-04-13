import React, {useEffect, useRef, useState} from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import infoCardCls from './InfoCard.module.scss'
import videoCardCls from './VideoCard.module.scss'
import cardsCls from './Cards.module.scss'
// import s from "../people-table/PeopleTable.module.scss";

import {getImageAdress, getVideoAdress} from "../../../services/getMedia";
import {SmallFavBtn, BigFavBtn} from "../fav-btn";





const positions = [];

/*
positions: [
    { cardId: 0, top: 300, bottom: 400 },
    { cardId: 5, top: 623, bottom: 723 },
    { cardId: 12, top: 1533, bottom: 1633 }
]
*/

function setNewPos(cardId, top, bottom) {
    const idx = positions.findIndex( obj => obj.cardId === cardId);

    if(idx === -1) positions.push({ cardId, top, bottom });
    else positions[idx] = { cardId, top, bottom};
}

/*setTimeout(() => {
    console.log(positions);
}, 2000);*/


function getPlayingVideoId() {

    // Массив куда попадут данные о видимых видео
    let visibleCards = [];

    // Переберу все карточки и помещу в visibleCards видимые
    positions.forEach(obj => {
        if(obj.top > 100 && obj.bottom < window.innerHeight + 100) visibleCards.push(obj);
    });
    
    if(!visibleCards.length) return null;

    // Определю верхнюю координату средней линии.
    const winMiddleLine =  Math.round( window.innerHeight / 2 );

    // Какую линию занимает последняя подходящая карточка
    let cardMiddleLine = getCardMiddleLine(visibleCards[0]);

    // id подходящей карточки
    let suitableCardId = visibleCards[0].cardId;

    // Различие между средней линией страницы и средней линией карточки
    let middleLineDiff = Math.abs( winMiddleLine - cardMiddleLine );
    // debugger;

    // Переберу карточки
    for(let i = 1; i < visibleCards.length; i++) {
        let card = visibleCards[i];

        // Какую линию занимает эта карточка
        let thisCardMiddleLine = getCardMiddleLine(card);

        // Различие между средней линией страницы и средней линией этой карточки
        let thisMiddleLineDiff = Math.abs( winMiddleLine - thisCardMiddleLine );

        if(thisMiddleLineDiff < middleLineDiff) {
            cardMiddleLine = thisCardMiddleLine;
            suitableCardId = card.cardId;

            middleLineDiff = thisMiddleLineDiff
        }
    }

    return suitableCardId
}

function getCardMiddleLine(card) {
    let cardHeight = Math.abs( card.top - card.bottom );

    return card.top + cardHeight / 2
}


function PeopleCards({dataArr}) {

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

    const cards = createCards(dataArr, setNewPos);

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
    let cardId = data.id;


    useEffect(() => {
        let sizes = videoRef.current.getBoundingClientRect();

        setNewPos(cardId, sizes.top, sizes.bottom);

        let topVideoId = getPlayingVideoId();

        if(topVideoId === data.id) videoRef.current.play();
    }, []);


    useScrollPosition(({ prevPos, currPos }) => {

        let sizes = videoRef.current.getBoundingClientRect();

        setNewPos(cardId, sizes.top, sizes.bottom);

        let topVideoId = getPlayingVideoId();

        if(topVideoId === data.id) videoRef.current.play();
        else videoRef.current.pause();
    });


    return (
        <video className={videoCardCls['video']} controls ref={videoRef} >
            <source src={getVideoAdress(data.video)} type="video/mp4" />
        </video>
    )
}



// Считаю эту функцию нужно перенести в файл со всеми функциями!
/*function getImageAdress(name) {

    switch (name) {
        case 'cat': return catImage;
        case 'dog': return dogImage;
        case 'fox': return foxImage;
        case 'koala': return koalaImage;
        case 'lion': return lionImage;
        case 'owl': return owlImage;
        case 'penguin': return penguinImage;
        case 'pig': return pigImage;
        case 'raccoon': return raccoonImage;
        case 'sheep': return sheepImage;
        default: return catImage;
    }
}*/



export default PeopleCards;