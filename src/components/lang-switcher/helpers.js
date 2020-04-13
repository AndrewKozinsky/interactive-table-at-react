/**
 * В зависимости от переданного языка функция ставит подсвечивающий элемент
 * под кнопкой переключающей этот язык чтобы визуально показать какой язык сейчас является активным.
 * @param {Object} highlightRef — ref на подсвечивающий прямоугольник.
 * @param {Object} engBtnRef — ref на кнопку переключения языка на английский.
 * @param {Object} rusBtnRef — ref на кнопку переключения языка на русский.
 * @param {String} lang — строка с названием языка: eng или rus.
 */
function moveHighlight(highlightRef, engBtnRef, rusBtnRef, lang) {

    // Подсвечивающий прямоугольник
    const highlight = highlightRef.current;

    // Если текущий язык — английский
    if(lang === 'eng') {
        // Получу ширину кнопки
        const engbtnWidth = getElemWidth(engBtnRef);

        // Поставлю эту ширину подсвечивающему элементу и поставлю его влево.
        highlight.style.width = engbtnWidth + 'px';
        highlight.style.left = 0;

    } else {
        // Получу ширины левой и правой кнопки переключающей языки.
        const rusBtnWidth = getElemWidth(rusBtnRef);
        const engBtnWidth = getElemWidth(engBtnRef);

        // Поставлю подсвечивающий прямоугольник вправо.
        highlight.style.width = rusBtnWidth + 'px';
        highlight.style.left = engBtnWidth + 'px';
    }
}

/**
 * Функция возвращающая ширину переданного элемента
 * @param {Object} elemRef — ref на элемент.
 * @return {number}
 */
function getElemWidth(elemRef) {
    let el = elemRef.current;

    const width = el.getBoundingClientRect().width;

    return Math.round(width)
}


export {
    moveHighlight
}