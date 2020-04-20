import {improvePeopleData} from "./improvePeopleData";


/**
 * Функция получает массив с улучшенными данными о людях скачанные с сервера
 * и возвращает новый массив где данные подготовлены для показа:
 * оставлены данные соответствующие поисковому слову, сортировке и порядку
 * @param lang
 * @param peopleData
 * @param searchWord
 * @param sortBy
 * @param order
 * @return {Array|this}
 */
function preparePeopleData(lang, peopleData, searchWord, sortBy, order) {

    // Отсортировать по поисковому слову
    let preparedData = filterDataBySearchWord(peopleData, searchWord);

    // Сортировать данные по полю и порядку следования
    preparedData = sortPeopleData(preparedData, sortBy, order);

    // Улучшить данные
    preparedData = improvePeopleData(preparedData, lang);

    return preparedData
}


/**
 * Функция получает массив с объектами с данными по людям и оставляет данные только тех людей, которые соответствующие поисковому слову.
 * @param {Array} peopleData — массив с данными людей, которые нужно отфильтровать.
 * @param {String} searchWord — поисковая фраза.
 * @return {Array}
 */
function filterDataBySearchWord(peopleData, searchWord) {

    // Если массив не передали, то завершить функцию.
    if(!peopleData) return null;

    // Если поискового слова нет, то вернуть весь массив.
    if(searchWord === '') return peopleData;


    // Перебрать массив с данными людей
    return peopleData.filter(obj => {

        // Получить имя и фамилию человека и сделать из него массив из двух элементов.
        const names = obj.name.split(' ');

        // Флаг сообщающий есть ли в имени или фамилии искомые символы.
        let res = false;

        // Перебрать имя и фамилию чтобы выяснить ли в имени или фамилии искомые символы.
        names.forEach(str => {
            const fixedStr = str.toLowerCase();
            const fixedSearchWord = searchWord.toLowerCase();

            if(fixedStr.includes(fixedSearchWord)) res = true;
        });

        return res
    })
}



/**
 * Функция сортирует данные по полю с учётом порядка
 * @param {Array} data — массив с объектами, которые нужно отсортировать.
 * @param {String} sortBy — поле по которому делать сортировку.
 * Есть три варианта: id, name и age
 * @param {String} order — метод сортировки
 * Есть два варианта: ascending и descending
 */
function sortPeopleData(data, sortBy, order) {

    if(!data) return data;

    // Отсортирую по полю и по порядку
    return data.sort(function(a, b) {

        return (order === 'asc') ?
            (a[sortBy] > b[sortBy] ? 1 : -1) :
            (a[sortBy] < b[sortBy] ? 1 : -1)
    });
}


export {
    preparePeopleData
};