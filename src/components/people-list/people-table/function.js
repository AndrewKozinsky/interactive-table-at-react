

/**
 * Функция перебирает все ряды в переданной обёртке wrapperElem и на их основе создаёт массив объектов:
 * Вроде такого: [ {id: 120, height: 54, top: 0}, {id: 41, height: 54, top: 64} ]
 * В id находится ID данных по которому ряд был создан. В height высота ряда. В top дистанция ряда до верха wrapperElem.
 * Этот массив объектов требуется чтобы узнать на сколько нужно переместить каждый ряд по высоте чтобы показать новый порядок рядов.
 * @param {HTMLElement} wrapperElem — элемент у которого перебираются дети для формирования массива.
 * @return {Array}
 */
function createRowsPositionMap(wrapperElem) {

    let resArr = [];

    for(let rowElem of wrapperElem.children) {
        const obj = {
            id: rowElem.getAttribute('data-row-id') * 1,
            height: rowElem.offsetHeight,
            top: rowElem.offsetTop
        };

        resArr.push(obj)
    }

    return resArr
}


/**
 * Функция выясняет на какой высоте должны располагаться ряды после того как изменился их порядок.
 * @param {Array} newDataArr — массив с порядком расположения рядов. Вроде такого:
 * [ {id: 120, ...}, {id: 41, ...} ]
 * @param {Array} rowsObjArr — массив объектов с данными расположения текущих рядов. Вроде такого:
 * [ {id: 120, height: 54, top: 0}, {id: 41, height: 54, top: 64} ]
 * Функция изменяет переданный массив.
 */
function setNewTopToRowsPositionMap(newDataArr, rowsObjArr) {

    // Перебрать все объекты с данными о текущем ряде из массива rowsObjArr
    for(let rowObj of rowsObjArr) {
        // Получить id данных.
        let id = rowObj.id;

        // В свойство newTop занести высоту на которой должен находиться ряд
        // чтобы соответствовать новому порядку расположения рядов.
        rowObj.newTop = getNewTopPos(id, newDataArr, rowsObjArr)
    }
}


/**
 * Функция возвращает высоту на котором должен располагаться ряд чтобы соответствовать новому порядку расположения рядов.
 * @param {Number} id — ID данных ряда
 * @param {Array} newDataArr — массив вида [ {id: 126, …}, {id: 69 …} ]
 * @param {Array} rowsObjArr — массив вида [ {id: 0, height: 54, top: 0}, {id: 1, height: 54, top: 64} ]
 */
function getNewTopPos(id, newDataArr, rowsObjArr) {

    // Высчитываемая новая высота
    let maxTop = 0;

    // Переберу массив объектов с новыми данными чтобы вычислить высоту
    // на которой будет находиться ряд после перемещения.
    for(let i = 0; i < newDataArr.length; i++) {
        // Перебираемый объект с новыми данными
        const newDataObj = newDataArr[i];

        // Найду ряд соответствующий id перебираемого объекта
        let thisRowObj;

        for(let j = 0; j < rowsObjArr.length; j++) {
            let rowObj = rowsObjArr[j];

            if(rowObj.id === newDataObj.id) {
                thisRowObj = rowObj;
                break;
            }
        }

        // Если переданный id найден, то значит высота вычислена. Завершить цикл.
        if(newDataObj.id === id) break;

        // Увеличу переменную maxTop на высоту этого ряда + нижний отступ.
        maxTop += thisRowObj.height + 10;
    }

    // Вернуть высчитанную высоту расположения ряда.
    return maxTop
}


/**
 * Функция перебирает объекты из переданного массива и создаёт свойство correlationTop
 * в котором будет разница между текущей высотой ряда и новой.
 * Как раз на эту высоту нужно переместить ряд чтобы он соответствовал новому порядку.
 * @param {Array} rowsObjArr — массив вида:
 * [ {id: 120, height: 54, top: 0, newTop: 6528}, {id: 79, height: 54, top: 64, newTop: 3648} ]
 */
function setCorrelationTopCoord(rowsObjArr) {

    for(let rowObj of rowsObjArr) {
        rowObj.correlationTop = rowObj.newTop - rowObj.top;
    }
}


/**
 * Функция проходит все ряды и ставил transform: translateY() в style.
 * Это приведёт к тому, что ряды плавно переместятся на новое место.
 * @param {HTMLElement} wrapperElem — элемент у которого перебираются дети для установки свойства transform.
 * @param {Array} rowsObjArr — массив вида:
 * [ {id: 120, height: 54, top: 0, newTop: 6528, correlationTop: 6528}, {id: 41, height: 54, top: 64, newTop: 9536, correlationTop: 9472} ]
 */
function setTranslateY(wrapperElem, rowsObjArr) {

    // Получу массив рядов.
    const rows = wrapperElem.children;

    // Перебрать ряды
    for(let rowEl of rows) {

        // Получу id ряда.
        let id = rowEl.getAttribute('data-row-id') * 1;

        // Найду объект где написано на сколько нужно переместить ряд
        // чтобы он встал на новое место соответствующее его новому расположению.
        let rowObj = rowsObjArr.find(obj => obj.id === id);

        // Поставить ряду transform и чтобы он переместился на новую позицию.
        rowEl.style.transform = `translateY(${rowObj.correlationTop}px)`;
    }
}


/**
 * Функция обнуляет свойство transition у детей переданного элемента
 * @param {HTMLElement} wrapperElem — элемент у детей которого нужно обнулить свойство transition.
 */
function setTransitionStyleToZero(wrapperElem) {

    for(let row of wrapperElem.children) {
        row.style.transition = 'transform 0s';
    }
}


/**
 * Функция убирает свойство transform из style у детей переданного элемента.
 * @param {HTMLElement} wrapperElem — элемент у детей которого нужно удалить transform из style.
 */
function clearTransformStyle(wrapperElem) {
    for(let row of wrapperElem.children) {
        row.style.transform = null;
    }
}


/**
 * Функция очищает удаляет style у детей переданного элемента.
 * @param {HTMLElement} wrapperElem — элемент у детей которого нужно удалить style.
 */
function clearStyle(wrapperElem) {
    for(let row of wrapperElem.children) {
        row.style = null;
    }
}



export {
    createRowsPositionMap,
    setNewTopToRowsPositionMap,
    setCorrelationTopCoord,
    setTranslateY,
    setTransitionStyleToZero,
    clearTransformStyle,
    clearStyle
}