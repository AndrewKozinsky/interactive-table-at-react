import {createStore} from "redux";
import {
    switchLang,
    setPeopleData,
    setPreparedPeopleData,
    setSearchWord,
    sortByField,
    changeOrder,
    changeView,
    setPeopleTableSettings,
    toggleFavoriteBtn,
} from './reducers'



const inicialState = {
    lang: 'eng', // rus или eng
    people: null,         // Данные о людях скачанные с сервера
    peoplePrepared: null, // Данные о людях готовые для показа
    peopleTableSettings: {
        sortBy: 'id', // id, name, age
        order: 'asc', // asc, des
        view: 'table', // table, cards
        searchWord: ''
    }
};

function reducer (state = inicialState, action) {

    switch (action.type) {
        case 'SWITCH_LANG': {
            return switchLang(state, action)
        }
        case 'SET_PEOPLE_DATA': {
            return setPeopleData(state, action)
        }
        case 'SET_PREPARED_PEOPLE_DATA': {
            return setPreparedPeopleData(state, action)
        }
        case 'SET_SEARCH_WORD': {
            return setSearchWord(state, action)
        }
        case 'SORT_BY_FIELD': {
            return sortByField(state, action)
        }
        case 'CHANGE_ORDER': {
            return changeOrder( state, action );
        }
        case 'CHANGE_VIEW': {
            return changeView(state, action)
        }
        case 'SET_PEOPLE_TABLE_SETTINGS': {
            return setPeopleTableSettings( state, action );
        }
        case 'TOGGLE_FAVORITE_BTN': {
            return toggleFavoriteBtn( state, action );
        }
        default: return inicialState;
    }
}

export default createStore(reducer);