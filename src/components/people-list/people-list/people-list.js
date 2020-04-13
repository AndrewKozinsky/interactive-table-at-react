import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../spinner";
import PeopleTable from "../people-table";
import PeopleCards from "../people-cards";
import {filterDataBySearchWord, sortPeopleData} from './functions/filterPeopleData';
import {getPeoleData} from './functions/getPeoleData';
import {setPeopleData, setImprovedPeopleData, setPeopleTableSettings} from '../../../store/actions';
import {getUrlQueryObj} from '../../../services/URLService';

// import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import {improvePeopleData} from "./functions/improvePeopleData";


function PeopleList() {
    // Анимированная сортировка
    // https://codepen.io/chrisdmacrae/pen/QyPboJ

    // Получить с Хранилища массив с данными о людях
    const [
        peopleData,
        peopleDataImproved,
        lang,
        searchWord
    ] = useSelector(state => [state.people, state.peopleImproved, state.lang, state.searchWord]);

    // Получить метод сортировки, порядок и вид.
    const {sortBy, order, view} = useSelector(state => state.peopleTableSettings);

    const dispatch = useDispatch();

    useEffect(() => {
        // Получить JSON со списком людей с сервера
        getPeoleData().then(data => {

            // Поставить в Хранилище скачанные данные
            dispatch(setPeopleData(data));

            // Дополнить и улучшить скачанные данные
            const improvedData = improvePeopleData(data, lang);

            // Поставить в Хранилище обработанные данные
            dispatch(setImprovedPeopleData(improvedData));
        });


        let urlSearchObj = getUrlQueryObj();

        if(Object.keys(urlSearchObj).length) {
            dispatch( setPeopleTableSettings(urlSearchObj) )
        }
    }, []);


    useEffect(() => {
        if(!peopleData) return;
        // Дополнить и улучшить скачанные данные
        const improvedData = improvePeopleData(peopleData, lang);

        // Поставить в Хранилище обработанные данные
        dispatch(setImprovedPeopleData(improvedData));
    }, [lang]);


    // Отфильтровать данные по полю поиска
    let preparedData = filterDataBySearchWord(peopleDataImproved, searchWord);

    // Отсортировать данные по текущему полю и порядку
    preparedData = sortPeopleData(preparedData, sortBy, order);



    let markup = <Spinner message='Загрузка списка' />;
    if(preparedData) {
        markup = (view === 'table') ? <PeopleTable dataArr={preparedData} /> : <PeopleCards dataArr={preparedData} />
    }


    return markup;
}

export default PeopleList;