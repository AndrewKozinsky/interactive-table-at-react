
// Файл с функциями работы с URL.

/**
 * Функция получает название и значения URL-запроса и ставит в адресную строку.
 * Например если передали sortBy и age, то адрес localhost:3000  -- превратится в -->  localhost:3000/?sortBy=age
 * Новое свойство будет установлено в  window.location.search. При этом перезагрузки страницы не происходит.
 * @param {String} prop — название свойства, которое нужно поставить в адресную строку. Например sortBy.
 * @param {String || Number} value — значение свойства, которое нужно поставить в адресную строку. Например age.
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
    // Взять запрос из URL.
    const queryStr = window.location.search; // ?some=4&another=5

    // Возвратить пустой объект если в URL нет запроса.
    if(queryStr === '') return {};

    // Убрать знак вопроса в начале строки
    let str = queryStr.substring(1); // some=4&another=5

    // Создать массив из строки
    let partsArr = str.split('&');

    // Возвращаемый объект где буду все свойства
    const queryObj = {};

    // Перебрать массив и наполнить объект queryObj ключами и значениями.
    partsArr.forEach(str => {
        let arr = str.split('=');

        queryObj[arr[0]] = arr[1];
    });

    return queryObj
}


/**
 * Функция получает объект вида {some: 4, another: 5} и создаёт из него строку вида ?some=4&another=5
 * @param {Object} queryObj — объект, который нужно преобразовать в строку.
 * @return {string} — возвращает строку, которую можно поставить как query в адресе.
 */
function turnQueryObjToQueryStr(queryObj) {
    // Итоговая строка, которая будет формироваться по ходу функции.
    let str = '?';

    // Перебрать переданный объект и пополнить строку значениями и ключами
    for(let key in queryObj) {
        str += key += '=' + queryObj[key];
        str += '&'
    }

    // Убрать последний &
    str = str.slice(0, -1);

    return str
}


export {
    changeSearchPartOfURL,
    getUrlQueryObj
}