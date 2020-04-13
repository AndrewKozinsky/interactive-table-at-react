
/**
 * Функция получает название и значения запроса и ставит в адресную строку.
 * То есть новые свойство будет установлено в  window.location.search. При этом перезагрузки страницы не происходит.
 * @param {String} prop — название свойства, которое нужно поставить в адресную строку.
 * @param {String || Number} value — значение свойства, которое нужно поставить в адресную строку.
 */
function changeSearchPartOfURL(prop, value) {

    // Получить объект из строки из window.location.search
    const searchObj = getUrlQueryObj();

    // Добавить/обновить переданное свойство в объекте
    searchObj[prop] = value;

    // Превратить строку из объекта
    const newSearchStr = turnQueryObjToQueryStr(searchObj);

    // Поставить в адресную строку новое значение.
    window.history.pushState("", "", newSearchStr);
}

/**
 * Функция получает значение свойства window.location.search и преобразует в его в объект
 * ?some=4&another=5 --> {some: 4, another: 5}
 * @return {{}}
 */
function getUrlQueryObj() {
    const queryStr = window.location.search; // ?some=4&another=5

    if(queryStr === '') return {};

    let str = queryStr.substring(1); // some=4&another=5

    let partsArr = str.split('&');

    const queryObj = {};

    partsArr.forEach(str => {
        let arr = str.split('=');

        queryObj[arr[0]] = arr[1];
    });

    return queryObj
}


/**
 * Функция получает объект вида {some: 4, another: 5} и создаёт из него строку вида ?some=4&another=5
 * @param {Object} queryObj — объект, который нужно преобразовать в строку
 * @return {string} — возвращает строку, которую можно поставить как query в адресе.
 */
function turnQueryObjToQueryStr(queryObj) {
    let str = '?';

    for(let key in queryObj) {
        str += key += '=' + queryObj[key];
        str += '&'
    }

    str = str.slice(0, -1); // Убрать последний &

    return str
}


export {
    changeSearchPartOfURL,
    getUrlQueryObj
}