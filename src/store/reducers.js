
/**
 * Функция меняющая язык интерфейса.
 * @param {Object} state — объект главного Хранилища
 * @param {Object} action — объект из action-функции.
 */
function switchLang(state, action) {
    // Скопировать объект Хранилища.
    const copyState = {...state};

    // Поменять язык на противоположный
    copyState.lang = (copyState.lang === 'rus') ? 'eng' : 'rus';

    // Возвратить обновлённый объект Хранилища.
    return copyState
}


/**
 * Функция помещающая в Хранилище массив со списком людей.
 * @param {Object} state — объект главного Хранилища.
 * @param {Object} action — объект где в свойство data помещён массив со списком людей скачанный с сервера.
 */
function setPeopleData(state, action) {
    // Скопировать объект Хранилища.
    const copyState = {...state};

    copyState.people = [...action.data];

    // Возвратить обновлённый объект Хранилища.
    return copyState
}


/**
 * Функция помещающая в Хранилище массив с данными людей готовыми для показа.
 * @param {Object} state — объект главного Хранилища.
 * @param {Object} action — объект где в свойство data помещён массив с данными людей готовыми для показа.
 */
function setPreparedPeopleData(state, action) {
    // Скопировать объект Хранилища.
    const copyState = {...state};

    // Поставить новые данные людей.
    copyState.peoplePrepared = action.data;

    // Возвратить обновлённый объект Хранилища.
    return copyState
}


/**
 * Функция помещающая в Хранилище поисковую строку
 * @param {Object} state — объект главного Хранилища.
 * @param {Object} action — объект где в свойстве str хранится строка для поиска
 */
function setSearchWord(state, action) {
    // Скопировать объект Хранилища.
    const copyState = {...state};

    // Скопировать объект peopleTableSettings.
    const copyPeopleTableSettings = {...state.peopleTableSettings};

    // Поставить новую строку поиска.
    copyPeopleTableSettings.searchWord = action.str;

    // Применить копию объекта peopleTableSettings.
    copyState.peopleTableSettings = copyPeopleTableSettings;

    // Возвратить обновлённый объект Хранилища.
    return copyState
}


/**
 * Функция меняющая метод сортировки таблицы людей
 * @param {Object} state — объект главного Хранилища.
 * @param {Object} action — объект где в свойстве field указано по какому полю делать сортировку.
 */
function sortByField(state, action) {
    // Скопировать объект Хранилища.
    const copyState = {...state};

    // Скопировать объект peopleTableSettings.
    const copyPeopleTableSettings = {...state.peopleTableSettings};

    // Поставить по какому полю нужно делать сортировку.
    copyPeopleTableSettings.sortBy = action.field;

    // Применить копию объекта peopleTableSettings.
    copyState.peopleTableSettings = copyPeopleTableSettings;

    // Возвратить обновлённый объект Хранилища.
    return copyState
}


/**
 * Функция меняющая порядок расположения данных в таблице людей.
 * @param {Object} state — объект главного Хранилища.
 * @param {Object} action — объект где в свойстве order указан спосок сортировки списка людей.
 */
function changeOrder(state, action) {
    // Скопировать объект Хранилища.
    const copyState = {...state};

    // Скопировать объект peopleTableSettings.
    const copyPeopleTableSettings = {...state.peopleTableSettings};

    // Поставить по какому порядку нужно делать сортировку.
    copyPeopleTableSettings.order = action.order;

    // Применить копию объекта peopleTableSettings.
    copyState.peopleTableSettings = copyPeopleTableSettings;

    // Возвратить обновлённый объект Хранилища.
    return copyState
}


/**
 * Функция меняющая вид таблицы людей.
 * @param {Object} state — объект главного Хранилища.
 * @param {Object} action — объект где в свойстве view указано как должен выглядеть список людей
 */
function changeView(state, action) {
    // Скопировать объект Хранилища.
    const copyState = {...state};

    // Скопировать объект peopleTableSettings.
    const copyPeopleTableSettings = {...state.peopleTableSettings};

    // Поставить вид таблицы.
    copyPeopleTableSettings.view = action.view;

    // Применить копию объекта peopleTableSettings.
    copyState.peopleTableSettings = copyPeopleTableSettings;

    // Возвратить обновлённый объект Хранилища.
    return copyState
}


/**
 * Функция изменяющая объект с настройками сортировки, вида и порядка вывода списка людей.
 * @param {Object} state — объект главного Хранилища.
 * @param {Object} action — объект где в свойстве view указано как должен выглядеть список людей
 */
function setPeopleTableSettings(state, action) {
    // Скопировать объект Хранилища.
    const copyState = {...state};

    // Скопировать объект peopleTableSettings.
    // И применить копию к copyState.

    copyState.peopleTableSettings = Object.assign({...state.peopleTableSettings}, action.settingsObj );

    // Возвратить обновлённый объект Хранилища.
    return copyState
}


/**
 * Функция меняет нахождение человека в Избранном.
 * @param {Object} state — объект главного Хранилища.
 * @param {Object} action — объект где в свойстве id указан id объекта где нужно поменять значение избранного на противоположное.
 */
function toggleFavoriteBtn(state, action) {
    // Скопировать объект Хранилища.
    const copyState = {...state};

    // Скопировать массив с данными о людях.
    let peopleCopy = [...copyState.people];

    // Найти объект где нужно поменять значение избранного на противоположное.
    for(let i = 0; i < peopleCopy.length; i++) {
        const obj = peopleCopy[i];

        if(action.id * 1 === obj.id * 1) {

            const objCopy = {...obj};
            objCopy.favourite = !objCopy.favourite;

            peopleCopy[i] = objCopy;
            break;
        }
    }

    // Поставить новый изменённый массив.
    copyState.people = peopleCopy;

    // Возвратить обновлённый объект Хранилища.
    return copyState
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
