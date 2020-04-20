
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
 * Action-функция ставящая в Хранилище массив со списком людей скачанный с сервера.
 * @param {Array} data — массив с данными людей.
 * @return {Object}
 */
function setPeopleData(data) {
    return {
        type: 'SET_PEOPLE_DATA',
        data
    }
}


/**
 * Action-функция ставящая в Хранилище массив с данными людей готовыми для показа.
 * @param {Array} data — массив данными людей готовыми для показа.
 * @return {Object}
 */
function setPreparedPeopleData(data) {
    return {
        type: 'SET_PREPARED_PEOPLE_DATA',
        data
    }
}


/**
 * Action-функция ставящая в Хранилище поисковую строку.
 * @param {String} str — поисковая строка.
 * @return {Object}
 */
function setSearchWord(str) {
    return {
        type: 'SET_SEARCH_WORD',
        str
    }
}


/**
 * Action-функция изменяющая текущее поле по которому сортируется таблица.
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
 * Action-функция меняющая порядок расположения данных в таблице людей.
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
 * Есть два варианта: table и cards
 * @return {Object}
 */
function changeView(view) {
    return {
        type: 'CHANGE_VIEW',
        view
    }
}


/**
 * Action-функция изменяющая объект с настройками сортировки, вида и порядка вывода списка людей.
 * @param {Object} settingsObj — объект с настройками вида списка людей.
 * Объект будет иметь примерно такие свойства: {
        sortBy: 'id', // id, name, age
        order: 'ascending', // ascending, descending
        view: 'table' // table, cards
    }
 * @return {Object}
 */
function setPeopleTableSettings(settingsObj) {
    return {
        type: 'SET_PEOPLE_TABLE_SETTINGS',
        settingsObj
    }
}


/**
 * Action-функция меняющая нахождение человека в Избранном.
 * @param {Number} id — идентификатор данных в массиве объектов с данными людей где нужно поменять значение.
 * @return {Object}
 */
function toggleFavoriteBtn(id) {
    return {
        type: 'TOGGLE_FAVORITE_BTN',
        id
    }
}



export {
    switchLang,
    setPeopleData,
    setPreparedPeopleData,
    setSearchWord,
    sortByField,
    changeOrder,
    changeView,
    setPeopleTableSettings,
    toggleFavoriteBtn,
}
