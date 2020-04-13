/**
 * Функция обрабатывает массив с объектами о людях.
 * @param dataArr
 * @param lang
 */
function improvePeopleData(dataArr, lang) {
    /*
    В каждом объекте из dataArr будет объект со свойствами:
        "id": 0,
        "favourite": false,
        "name": "Gilbert Morton",
        "age": 30,
        "phone": "(369) 432-9206",
        "image": "sheep",
        "phrase": "Japman somam mes lizmasapa om zefopi ki wa ogju mofrajnir denba uc famoso opeipu woul.",
        "video": "shoe"
    * */

    const dataArrCopy = [...dataArr];

    return dataArrCopy.map(obj => {
        const objCopy = {...obj};

        objCopy.age = improveAge(objCopy.age, lang);
        objCopy.phoneHref = getPhoneHref(objCopy.phone);

        return objCopy;
    })
}


function improveAge(age, lang) {

    let num = age * 1;

    if(lang === 'rus') {
        const years = ['год', 'года', 'лет'];

        const n = Math.abs(num) % 100;
        let n1 = n % 10;

        if (n > 10 && n < 20) return `${num} ${years[2]}`;
        if (n1 > 1 && n1 < 5) return `${num} ${years[1]}`;
        if (n1 === 1) return `${num} ${years[0]}`;

        return `${num} ${years[2]}`;
    }

    if(lang === 'eng') {
        return (num === 1) ? `1 year` : `${num} years`;
    }
}


/**
 * Функция делает из строки вида "(369) 432-9206" строка с номером телефона чтобы можно было поставить в href.
 * @param {String} phone — строка вида
 * @return {string}
 */
function getPhoneHref(phone) {
    return '8' + phone.replace(/[\s\(\)-]/g, '');
}




export {
    improvePeopleData
}