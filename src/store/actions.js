
/**
 * Action-функция меняющая язык интерфейса.
 * @return {Object}
 */
function switchLang(field) {
    return {
        type: 'SWITCH_LANG'
    }
}


/**
 * Action-функция ставящая в Хранилище массив со списком людей.
 * @param {Array} data — массив списка людей.
 * @return {Object}
 */
function setPeopleData(data) {
    return {
        type: 'SET_PEOPLE_DATA',
        data
    }
}


/**
 * Action-функция ставящая в Хранилище массив со списком людей.
 * @param {Array} data — массив списка людей.
 * @return {Object}
 */
function setImprovedPeopleData(data) {
    return {
        type: 'SET_IMPROVED_PEOPLE_DATA',
        data
    }
}


/**
 * Action-функция ставящая в Хранилище массив со списком людей.
 * @param {String} str — поисковая строка
 * @return {Object}
 */
function setSearchWord(str) {
    return {
        type: 'SET_SEARCH_WORD',
        str
    }
}


/**
 * Action-функция изменяющая текущее поле.
 * @param {String} field — имя поля которое должно стать текущим.
 * Есть три варианта: id, name и age
 * @return {Object}
 */
function sortByField(field) {
    return {
        type: 'SORT_BY_FIELD',
        field
    }
}


/**
 * Action-функция изменяющая метод сортировки списка людей.
 * @param {String} order — метод сортировки списка людей.
 * Есть два варианта: ascending и descending
 * @return {Object}
 */
function changeOrder(order) {
    return {
        type: 'CHANGE_ORDER',
        order
    }
}


/**
 * Action-функция изменяющая метод сортировки списка людей.
 * @param {String} view — вид списка людей.
 * Есть два варианта: table и preview
 * @return {Object}
 */
function changeView(view) {
    return {
        type: 'CHANGE_VIEW',
        view
    }
}


/**
 * Action-функция изменяющая метод сортировки списка людей.
 * @param {Object} settingsObj — объект с настройками вида списка людей.
 * Объект будет иметь примерно такие свойства: {
        sortBy: 'id', // id, name, age
        order: 'ascending', // ascending, descending
        view: 'table' // table, preview
    }
 * @return {Object}
 */
function setPeopleTableSettings(settingsObj) {
    return {
        type: 'SET_PEOPLE_TABLE_SETTINGS',
        settingsObj
    }
}


function toggleFavoriteBtn(id) {
    return {
        type: 'TOGGLE_FAVORITE_BTN',
        id
    }
}



export {
    switchLang,
    setPeopleData,
    setImprovedPeopleData,
    setSearchWord,
    sortByField,
    changeOrder,
    changeView,
    setPeopleTableSettings,
    toggleFavoriteBtn,
}
