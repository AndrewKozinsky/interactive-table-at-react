/**
 * Функция принимает язык и объект с переводом слов.
 * Возвращает новый объект только с теми словами, которые подходят под переданный язык.
 * @param {String} lang — язык на котором нужно возвратить перевод слов.
 * @param {Object} textObj — объект где даны слова на нескольких языках. Такого вида:
 * {
    header: {
        rus: 'Порядок:',
        eng: 'Order:',
    },
    title: {
        rus: 'Порядок по возрастанию',
        eng: 'Ascending order'
    }
  }
 * @return {Object} — возвращаемый объект будет иметь такую структуру:
 * {
    header: 'Порядок:',
    title: 'Порядок по возрастанию'
  }
 */
export default function (lang, textObj) {

    // Возвращаемый объект
    let resObj = {};

    // Пройти по переданному объекту и взять слова определённого перевода.
    for(let key in textObj) {
        resObj[key] = textObj[key][lang]
    }

    return resObj
}