
/**
 * Функция меняющая метод сортировки таблицы людей
 * @param {Object} state — объект главного хранилища
 * @param {Object} action — объект где в свойстве field указано по какому полю делать сортировку
 */
function switchLang(state, action) {
    const copyState = {...state};

    copyState.lang = (copyState.lang === 'rus') ? 'eng' : 'rus';

    return copyState
}


/**
 * Функция помещающая в Хранилище массив со списком людей
 * @param {Object} state — объект главного хранилища
 * @param {Object} action — объект где в свойстве view указано как должен выглядеть список людей
 */
function setPeopleData(state, action) {
    const copyState = {...state};
    copyState.people = action.data;

    return copyState
}


/**
 * Функция помещающая в Хранилище массив со списком людей
 * @param {Object} state — объект главного хранилища
 * @param {Object} action — объект где в свойстве view указано как должен выглядеть список людей
 */
function setImprovedPeopleData(state, action) {
    const copyState = {...state};
    copyState.peopleImproved = action.data;

    return copyState
}


/**
 * Функция помещающая в Хранилище поисковую строку
 * @param {Object} state — объект главного хранилища
 * @param {Object} action — объект где в свойстве str со строкой для поиска
 */
function setSearchWord(state, action) {
    const copyState = {...state};
    copyState.searchWord = action.str;

    return copyState
}


/**
 * Функция меняющая метод сортировки таблицы людей
 * @param {Object} state — объект главного хранилища
 * @param {Object} action — объект где в свойстве field указано по какому полю делать сортировку
 */
function sortByField(state, action) {
    const copyState = {...state};
    const copyPeopleTableSettings = {...state.peopleTableSettings};

    copyPeopleTableSettings.sortBy = action.field;
    copyState.peopleTableSettings = copyPeopleTableSettings;

    return copyState
}


/**
 * Функция меняющая метод сортировки таблицы людей
 * @param {Object} state — объект главного хранилища
 * @param {Object} action — объект где в свойстве order указан спосок сортировки списка людей.
 */
function changeOrder(state, action) {
    const copyState = {...state};
    const copyPeopleTableSettings = {...state.peopleTableSettings};

    copyPeopleTableSettings.order = action.order;
    copyState.peopleTableSettings = copyPeopleTableSettings;

    return copyState
}


/**
 * Функция меняющая вид таблицы людей
 * @param {Object} state — объект главного хранилища
 * @param {Object} action — объект где в свойстве view указано как должен выглядеть список людей
 */
function changeView(state, action) {
    const copyState = {...state};
    const copyPeopleTableSettings = {...state.peopleTableSettings};

    copyPeopleTableSettings.view = action.view;
    copyState.peopleTableSettings = copyPeopleTableSettings;

    return copyState
}


/**
 * Функция меняющая вид таблицы людей
 * @param {Object} state — объект главного хранилища
 * @param {Object} action — объект где в свойстве view указано как должен выглядеть список людей
 */
function setPeopleTableSettings(state, action) {
    const copyState = {...state};

    const newPeopleTableSettings = Object.assign({...state.peopleTableSettings}, action.settingsObj );

    copyState.peopleTableSettings = newPeopleTableSettings;
    return copyState
}



function toggleFavoriteBtn(state, action) {

    const copyState = {...state};
    let peopleImprovedCopy = [...copyState.peopleImproved];


    for(let i = 0; i < peopleImprovedCopy.length; i++) {
        const obj = peopleImprovedCopy[i];
        // debugger;

        if(action.id * 1 == obj.id * 1) {

            const objCopy = {...obj};
            objCopy.favourite = !objCopy.favourite;

            peopleImprovedCopy[i] = objCopy;
            break;
        }
    }

    copyState.peopleImproved = peopleImprovedCopy;
    return copyState
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
