/**
 * Функция регулирующая показ фиксированной шапки в зависимости от прокрутки страницы.
 * @param {Number} top — значение прокрутки страницы.
 * @param {Boolean} showHeader — отрисована ли шапка
 * @param {Function} setShowHeader — функция устанавливающая значение переменной showHeader
 * @param {Object} sectionRef — ref на шапку
 */
function manageHeaderVisibility(top, showHeader, setShowHeader, sectionRef) {

    // Если значение прокрутки меньше 100 и шапка не показана, то...
    if(top < -100 && !showHeader) {
        // Отрисовать шапку
        setShowHeader(true);
        // Поставить шапку к верху экрана
        mountHeader(sectionRef)
    }

    // Если шапка не отрисована, то завершить функцию
    if(!showHeader) return;

    // Шапка отрисована...
    // В зависимости от значения прокрутки ставить шапку наверх или скрывать с экрана
    if(top < -100) {
        sectionRef.current.style.top = 0;
    } else {
        hideHeader(sectionRef)
    }
}


/**
 * Функция ставит шапку на верх страницы.
 * @param sectionRef
 */
function mountHeader(sectionRef) {
    const section = sectionRef.current;

    setTimeout(() => {
        section.style.top = 0
    }, 100)
}


/**
 * Функция поднимает шапку чтобы она оказалась выше экрана.
 * @param {Object} sectionRef — ref на шапку.
 */
function hideHeader(sectionRef) {
    const section = sectionRef.current;
    const sectionHeight = section.getBoundingClientRect().height;

    section.style.top = -Math.ceil(sectionHeight) - 2 + 'px'
}


export {
    manageHeaderVisibility
}