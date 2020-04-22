/**
 * Функция получает с сервера JSON со списком людей
 * @return {Promise<null|any>}
 */
async function getPeopleData() {
    const adress = 'http://andrewkozinsky.ru/samples/chu/data-provider/people-data.php';

    const fetchSettings = {
        method: 'GET', mode: 'cors'
    };

    let result = null;

    try {
        return await fetch(adress, fetchSettings)
            .then( data => data.json())
            .then( data => data);

    } catch(err) {}

    return result;
}


export {
    getPeopleData
};