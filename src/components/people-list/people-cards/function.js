// Этот useEffect срабатывает при изменеии peopleDataPrepared.
// В этом свойстве хранится новый порядок расположения рядов.
// useEffect(() => {

    // Все операции ниже требуются чтобы при изменении peopleDataPrepared
    // плавно перенести карточки на новое место показав как именно происходит сортировка.

    // Переберу карточки и получу высоту, id данных, расстояние до левого края и верха. Положу эти данные в объект, а объекты в массив cardsPositionsMap.
    // В cardsPositionsMap будет массив вида: [ {id: 69, height: 183, left: 477, top: 0}, {id: 28, height: 183, left: 0, top: 203} ]
    // const cardsPositionsMap = createCardsPositionMap(wrapperRef.current);

    // Создам карту данных с новым расположением карточек
    // const dataPositionsMap = createDataPositionMap(peopleDataPrepared);


    // На основе данных из dataPositionsMap вычислить на какой высоте должны располагаться ряды после сортировки.
    // В cardsPositionsMap будет массив вида: [ {id: 120, height: 54, top: 0, newTop: 6528}, {id: 79, height: 54, top: 64, newTop: 3648} ]
    // setNewOffsetToCardsPositionMap(cardsPositionsMap, dataPositionsMap);


    // Поставить значение корректирующей координаты
    // В cardsPositionsMap будет массив вида: [ {id: 120, height: 54, top: 0, newTop: 6528, correlationTop: 6528}, {id: 41, height: 54, top: 64, newTop: 9536, correlationTop: 9472} ]
    // setCorrelationTopCoord(cardsPositionsMap);

    // Поставить transform: translateY() в style. Это приведёт к тому, что ряды плавно переместятся на новое место.
    // setTranslateY(wrapperRef.current, cardsPositionsMap);


    // Как только анимация завершится...
    /*setTimeout(() => {

        // Поставить свойство transition в transform 0s
        // потому что дальше свойство transform будет изменено и я не хочу чтобы оно изменялось плавно.
        setTransitionStyleToZero(wrapperRef.current);

        // Изменение transition требует время, поэтому выполню код ниже через setTimeout
        setTimeout(() => {

            // Убрать у рядов свойство transform в style потому что сцена будет перерисована под новые настройки показа рядов.
            // Установленный transform будет искажать положение элементов
            clearTransformStyle(wrapperRef.current);

            // Поставить случайное число в needToUpdate, которое является Состоянием, чтобы спровоцировать перерисовку рядов таблицы.
            setNeedToUpdate(Math.random());

            // Как все манипуляции будут выполнены...
            setTimeout(() => {
                // ... тогда полностью очистить style всех рядов.
                clearStyle(wrapperRef.current);
            }, 0);

        }, 0);

    }, 1000);*/

// }, [peopleDataPrepared]);



/**
 * Функция перебирает все карточки в переданной обёртке wrapperElem и на их основе создаёт массив объектов:
 * Вроде такого: [ {id: 69, height: 183, left: 477, top: 0}, {id: 28, height: 183, left: 0, top: 203} ]
 *      В id находится ID данных по которому карточка была создана.
 *      В height высота карточки.
 *      В left дистанция карточки до левого края wrapperElem.
 *      В top дистанция ряда до верха wrapperElem.
 * Этот массив объектов требуется чтобы узнать на сколько нужно переместить каждую карточку чтобы показать новый порядок карточек.
 * @param {HTMLElement} wrapperElem — элемент у которого перебираются карточки для формирования массива.
 * @return {Array}
 */
/*function createCardsPositionMap(wrapperElem) {

    const cardElems = wrapperElem.querySelectorAll('[data-row-id]');

    let resArr = [];

    for(let cardElem of cardElems) {
        const obj = {
            id: cardElem.getAttribute('data-row-id') * 1,
            height: cardElem.offsetHeight,
            left: cardElem.offsetLeft,
            top: cardElem.offsetTop
        };

        resArr.push(obj)
    }

    return resArr
}*/


/**
 * Функция создаёт массив массивов с новым расположением карточек. Вложенный массив обозначает ряд. Элементы обозначают карточки.
 * В ряде может быть одна или две карточки. Если в ряде одна карточка, значит это карточка с видео.
 * Массив будет выглядеть как-то так:
 * [
 *      [ {id: 120} ],
 *      [ {id: 18}, {id: 41} ],
 * ]
 * @param {Array} newDataArr — массив объектов с данными карточек.
 * @return {[]} — функция возвращает массив с новым расположением карточек.
 */
/*function createDataPositionMap(newDataArr) {

    let sectionsData = [];

    // Перебрать все объекты с данными карточки из массива newDataArr
    for(let i = 0; i < newDataArr.length; i++) {
        let data = newDataArr[i];

        if(data.video) {
            sectionsData.push( [data]  )
        } else {
            sectionsData.push( [data, newDataArr[i + 1]] );
            // Увеличить счётчик потому что я поместил две карточки в обёртку.
            i++
        }
    }

    return sectionsData;
}*/




/**
 * Функция выясняет новые координаты располажения карточки после того как изменился их порядок.
 * @param {Array} cardsPositionsMap — массив объектов с данными расположения текущих карточек. Вроде такого:
 * [
 *      {id: 69, height: 183, left: 477, top: 0},
 *      {id: 28, height: 183, left: 0, top: 203}
 * ]
 *
 * * @param {Array} dataPositionsMap — массив с новым порядком расположения карточек. Вроде такого:
 * [
 *      [ {id: 120} ],
 *      [ {id: 18}, {id: 41} ],
 * ]
 * Функция изменяет переданный массив cardsPositionsMap.
 */
/*function setNewOffsetToCardsPositionMap(cardsPositionsMap, dataPositionsMap) {

    // Перебрать все объекты с данными о текущей карточке из массива cardsPositionsMap
    for(let cardPosObj of cardsPositionsMap) {
        // Получить id данных.
        let id = cardPosObj.id;

        // В свойство newTop занести высоту на которой должен находиться карточка
        // чтобы соответствовать новому порядку расположения.
        cardPosObj.newTop = getNewTopPos(id, cardsPositionsMap, dataPositionsMap)
    }
}*/


/**
 * Функция возвращает высоту на котором должен располагаться ряд чтобы соответствовать новому порядку расположения рядов.
 * @param {Number} id — ID данных карточки
 * @param {Array} cardsPositionsMap — массив объектов с данными расположения текущих карточек. Вроде такого:
 * [
 *      {id: 69, height: 183, left: 477, top: 0},
 *      {id: 28, height: 183, left: 0, top: 203}
 * ]
 *
 * * @param {Array} newDataMap — массив с новым порядком расположения карточек. Вроде такого:
 * [
 *      [ {id: 120} ],
 *      [ {id: 18}, {id: 41} ],
 * ]
 */
/*function getNewTopPos(id, cardsPositionsMap, newDataMap) {

    // Высчитываемая новая высота
    let maxTop = 0;

    // Переберу массив объектов с новыми данными чтобы вычислить высоту
    // на которой будет находиться карточка после перемещения.
    for(let i = 0; i < newDataMap.length; i++) {

        // Поищу в текущем ряде объект с таким же id.
        let isObjectFound = newDataMap[i].find(obj => obj.id === id);
        // Если объект с переданным id найден, то значит высота вычислена. Завершить цикл.
        if(isObjectFound) break;


        // Перебираемый объект с новыми данными располажения карточки
        let newDataObj = newDataMap[i][0];

        // Получу высоту этой карточки найдя её перебором
        for(let j = 0; j < cardsPositionsMap.length; j++) {
            let cardObj = cardsPositionsMap[j];

            if(cardObj.id === newDataObj.id) {
                // Увеличу переменную maxTop на высоту этого ряда + нижний отступ.
                maxTop += cardObj.height + 20;
                break;
            }
        }
    }

    // Вернуть высчитанную высоту расположения ряда.
    return maxTop
}*/


/**
 * Функция перебирает объекты из переданного массива и создаёт свойство correlationTop
 * в котором будет разница между текущей высотой ряда и новой.
 * Как раз на эту высоту нужно переместить ряд чтобы он соответствовал новому порядку.
 * @param {Array} rowsObjArr — массив вида:
 * [ {id: 120, height: 54, top: 0, newTop: 6528}, {id: 79, height: 54, top: 64, newTop: 3648} ]
 */
/*function setCorrelationTopCoord(rowsObjArr) {

    for(let rowObj of rowsObjArr) {
        rowObj.correlationTop = rowObj.newTop - rowObj.top;
    }
}*/


/**
 * Функция проходит все ряды и ставил transform: translateY() в style.
 * Это приведёт к тому, что ряды плавно переместятся на новое место.
 * @param {HTMLElement} wrapperElem — элемент у которого перебираются дети для установки свойства transform.
 * @param {Array} rowsObjArr — массив вида:
 * [ {id: 120, height: 54, top: 0, newTop: 6528, correlationTop: 6528}, {id: 41, height: 54, top: 64, newTop: 9536, correlationTop: 9472} ]
 */
/*function setTranslateY(wrapperElem, rowsObjArr) {

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
}*/


/**
 * Функция обнуляет свойство transition у детей переданного элемента
 * @param {HTMLElement} wrapperElem — элемент у детей которого нужно обнулить свойство transition.
 */
/*function setTransitionStyleToZero(wrapperElem) {

    for(let row of wrapperElem.children) {
        row.style.transition = 'transform 0s';
    }
}*/


/**
 * Функция убирает свойство transform из style у детей переданного элемента.
 * @param {HTMLElement} wrapperElem — элемент у детей которого нужно удалить transform из style.
 */
/*function clearTransformStyle(wrapperElem) {
    for(let row of wrapperElem.children) {
        row.style.transform = null;
    }
}*/


/**
 * Функция очищает удаляет style у детей переданного элемента.
 * @param {HTMLElement} wrapperElem — элемент у детей которого нужно удалить style.
 */
/*function clearStyle(wrapperElem) {
    for(let row of wrapperElem.children) {
        row.style = null;
    }
}*/



export {
    // createCardsPositionMap,
    // createDataPositionMap,
    // setNewOffsetToCardsPositionMap,
    // setCorrelationTopCoord,
    // setTranslateY,
    // setTransitionStyleToZero,
    // clearTransformStyle,
    // clearStyle
}