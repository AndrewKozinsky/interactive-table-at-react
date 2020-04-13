import React, {useCallback} from 'react';
import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {setSearchWord} from '../../../store/actions';
import SearchInput from "../search-input";
import getTexts from '../../../services/getTexts'
import textObj from './text'


function Search() {

    const searchWord = useSelector(state => state.searchWord, shallowEqual);
    const dispatch = useDispatch();

    // Получу текущий язык
    const lang = useSelector(state => state.lang);

    // Получу тексты компонента
    let texts = getTexts(lang, textObj);

    const onChange = useCallback( (e) => {
        dispatch(setSearchWord(e.target.value))
    }, [dispatch]);

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