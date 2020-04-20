import React from 'react';
import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {setSearchWord} from '../../../store/actions';
import SearchInput from "../search-input";
import getTexts from '../../../services/getTexts'
import textObj from './text'


/**
 * Функция возвращает форму с поисковым элементом ввода.
 * @return {Object} JSX компонента.
 */
function Search() {

    // Получу текущий язык и подготовленные данные.
    const lang = useSelector(state => state.lang, shallowEqual);

    // Получу текущее выделенной поле, порядок и искомое слово
    const {searchWord} = useSelector(state => state.peopleTableSettings, shallowEqual);

    const dispatch = useDispatch();


    // Сформирую тексты компонента
    let texts = getTexts(lang, textObj);

    // Обработчик ввода текста в элемент ввода.
    const onChange = (e) => {

        // Получу введённое слово.
        const searchWord = e.target.value;

        // Изменить искомое слово в Хранилище.
        dispatch(setSearchWord(searchWord));
    };


    return (
        <form>
            <SearchInput
                value={searchWord}
                onChange={onChange}
                placeholder={texts.placeholder}
            />
        </form>
    )
}

export default Search;