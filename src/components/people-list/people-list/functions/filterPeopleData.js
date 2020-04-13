


function filterDataBySearchWord(dataArr, searchWord) {

    if(!dataArr) return null;

    if(searchWord === '') return dataArr;


    return dataArr.filter(obj => {

        const names = obj.name.split(' ');

        let res = false;
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
    filterDataBySearchWord,
    sortPeopleData,
};