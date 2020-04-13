import React, {useCallback} from 'react';
import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {setSearchWord} from '../../../store/actions';
import SearchInput from "../search-input";


function Search() {

    const searchWord = useSelector(state => state.searchWord, shallowEqual);
    const dispatch = useDispatch();

    const onChange = useCallback( (e) => {
        dispatch(setSearchWord(e.target.value))
    }, [dispatch]);

    return (
        <form>
            <SearchInput value={searchWord} onChange={onChange} />
        </form>
    )
}

export default Search;