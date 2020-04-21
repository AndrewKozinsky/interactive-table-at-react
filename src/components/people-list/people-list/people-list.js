import React, {useEffect, shallowEqual} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../spinner";
import {PeopleTable} from "../people-table";
import PeopleCards from "../people-cards";
import {getPeopleData} from './functions/getPeopleData';
import {setPeopleData, setPeopleTableSettings, setPreparedPeopleData} from '../../../store/actions';
import {getUrlQueryObj} from '../../../services/URLService';
import {preparePeopleData} from "../../../services/preparePeopleData";


/**
 * Функция возвращает компонент...
 * @return {Object} JSX компонента.
 */
function PeopleList() {

    // Получить с Хранилища массив с данными о людях
    const [ peopleData, peopleDataPrepared, lang ] = useSelector(state => [state.people, state.peoplePrepared, state.lang], shallowEqual);

    // Получить метод сортировки, порядок и вид.
    const {sortBy, order, view, searchWord} = useSelector(state => state.peopleTableSettings, shallowEqual);

    const dispatch = useDispatch();


    // При загрузке компонента...
    useEffect(() => {

        // Получить значения строки запроса из URL и преобразовать в объект
        // Это нужно чтобы настроить показ данных как это указано в URL
        let urlSearchObj = getUrlQueryObj();

        // Если в адресной строке передали настройки отображения списка людей...
        if(Object.keys(urlSearchObj).length) {
            // ...то поставить эти настройки в Хранилище.
            dispatch( setPeopleTableSettings(urlSearchObj) )
        }

        // Получить JSON со списком людей с сервера
        getPeopleData().then(data => {
            // Поставить в Хранилище скачанные данные
            dispatch(setPeopleData(data));

            // Приготовить данные для показа (отсортировать по текущему полю и порядку)
            let preparedData = preparePeopleData(lang, data, searchWord, (urlSearchObj.sortBy || sortBy), (urlSearchObj.order || order));

            // Поставить в Хранилище данные готовые для показа
            dispatch(setPreparedPeopleData(preparedData));
        });

    }, []);


    useEffect(() => {
        if(!peopleData) return;
        // Приготовить данные для показа (отсортировать по текущему полю и порядку)
        let preparedData = preparePeopleData(lang, peopleData, searchWord, sortBy, order);

        // Поставить в Хранилище данные готовые для показа
        dispatch(setPreparedPeopleData(preparedData));
    }, [lang, peopleData, sortBy, order, view, searchWord]);


    // Сформирую разметку компонента.
    let markup = <Spinner message='Загрузка списка' />;

    if(peopleDataPrepared) {
        markup = (view === 'table') ? <PeopleTable /> : <PeopleCards />
    }

    return markup;
}

export default PeopleList;