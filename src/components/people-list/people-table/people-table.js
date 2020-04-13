import React from 'react';
import { SmallFavBtn, BigFavBtn } from '../fav-btn';
import s from './PeopleTable.module.scss'
import {getImageAdress} from "../../../services/getMedia";





function PeopleTable({dataArr}) {
    const rows = dataArr.map((data, i) => {
        return <Row data={data} key={data.id} />
    });

    return (
        <section className={s.rowsWrapper}>
            {rows}
        </section>
    )
}



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
        <div className={rowClasses}>
            <img src={getImageAdress(data.image)} className={s.userPic} />
            <div className={s.leftPart}>
                <h4 className={s.name}>{data.name}</h4>
                <div className={s.favSmallBtnWrapper}>
                    <SmallFavBtn data={data} />
                </div>
                <p className={s.age}>{data.age}</p>
                <p className={s.phone}>
                    <a href={'tel:'+data.phoneHref}>{data.phone}</a>
                </p>
            </div>
            <div className={s.rightPart}>
                <BigFavBtn data={data} />
            </div>
        </div>
    )
}



export default PeopleTable;