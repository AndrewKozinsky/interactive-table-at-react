// Переменная где хранится ссылка на проигрываемое видео.
let playedVideo = null;

// Флаг сообщающий разрешено ли сценарию автоматически запускать видео.
let videoAllowedToRunAutomatically = true;

// Флаг сообщающий, что видео было запущено автоматически
let videoWasRunByScript = false;

// Массив с объектами с данными обо всех видео на странице.
const videoDataArr = [];
/* videoDataArr: [
    {
        id: 0,
        top: 300,
        bottom: 400,
        readyToAutoPlay: true,
        video: video
    },
    {...},
    {...},
] */


function clearVideoDataArr() {
    videoDataArr.length = 0;
}


/**
 * Функция ставит в массив videoDataArr объект с данными о местоположении переданного видео.
 * @param {HTMLElement} videoEl — ссылка на видео.
 * @param {Number} cardId — id карточки где находится видео.
 */
function setDataObjToVideoDataArr(videoEl, cardId) {
    // Получить координаты видео на странице
    let sizes = videoEl.getBoundingClientRect();

    // Подготовлю объект с данными видео
    let videoObj = {
        id: cardId,
        top: sizes.top,
        bottom: sizes.bottom,
        readyToAutoPlay: true,
        video: videoEl
    };

    // Поставлю объект в массив videoDataArr
    videoDataArr.push(videoObj);
}


/**
 * Функция обновляет данные объекта с положении видео на экране
 * @param {HTMLElement} videoEl — ссылка на видео.
 * @param {Number} cardId — id карточки где находится видео.
 */
function updateVideoObj(videoEl, cardId) {
    // Получить координаты видео на странице
    let sizes = videoEl.getBoundingClientRect();

    // Подготовлю объект с данными видео
    let videoObj = {
        id: cardId,
        top: sizes.top,
        bottom: sizes.bottom,
    };

    // В массиве videoDataArr найти idx объекта, которому нужно обновить некоторые свойства.
    const idx = videoDataArr.findIndex( obj => obj.id === videoObj.id);

    // Обновить свойства найденного объекта с данными о видео.
    videoDataArr[idx] = Object.assign(videoDataArr[idx], videoObj);
}


/**
 * Функция регулирует воспроизведение и остановку всех видео на странице.
 */
function videoPlaybackControl() {

    // Если запрещён автоматический запуск видео
    if(!videoAllowedToRunAutomatically) {

        // Если проигрываемое видео есть
        if(playedVideo) {
            // Получить координаты видео на странице
            let sizes = playedVideo.getBoundingClientRect();

            // Если проигрываемое видео всё еще на экране...
            if(sizes.top > -10 && sizes.bottom < window.innerHeight + 80) {
                // ... завершить функцию
                return;
            }
            // Видео скрылось с экрана...
            else {
                // То позволить автоматический запуск видео.
                videoAllowedToRunAutomatically = true;
            }
        }
        // Если проигрываемого видео нет...
        else {
            // То позволить автоматический запуск видео.
            videoAllowedToRunAutomatically = true;
        }
    }

    // Получу карточку подходящую для проигрывания
    let suitableVideo = getSuitableVideo();

    // Если подходящего видео нет....
    if(!suitableVideo) {
        // Завершить проигрывание видео если такое видео есть
        if(playedVideo) playedVideo.pause();

        // Завершить функцию.
        return;
    }


    // Если подходящее видео равно проигрываемому, то завершить функцию
    if(playedVideo === suitableVideo.video) return;

    // Остановить воспроизведение текущего видео
    if(playedVideo) playedVideo.pause();

    // Поставить флаг что видео было запущено сценарием.
    videoWasRunByScript = true;
    setTimeout(() => {videoWasRunByScript = false}, 100);


    // Запустить проигрывание карточки
    let playPromise = suitableVideo.video.play();
    if (playPromise !== undefined) {
        playPromise
        .then(_ => {
            // Automatic playback started! Show playing UI.
            // console.log("audio played auto");
        })
        .catch(error => {
            // Auto-play was prevented. Show paused UI.
            // console.log("playback prevented");
        });
    }

    // Поместить в переменную ссылку на проигрываемое видео
    playedVideo = suitableVideo.video;

}


/**
 * Функция возвращает объект с данными видео, которое можно проигрывать в данный момент.
 * @return {null|*}
 */
function getSuitableVideo() {

    // Массив куда попадут данные о видимых видео
    let visibleVideos = [];

    // Переберу все карточки и помещу в visibleVideos видимые видео.
    // Так же у карточек свойство readyToAutoPlay должно быть в true.
    videoDataArr.forEach(obj => {
        // Если видео видимо на странице...
        if(obj.top > 100 && obj.bottom < window.innerHeight - 100) {
            if(obj.readyToAutoPlay) {
                visibleVideos.push(obj);
            }
        }
        // Если видео не видимо на странице...
        if(obj.top < -100 || obj.bottom > window.innerHeight + 100) {
            // Разрешить ему проигрываться автоматически
            obj.readyToAutoPlay = true
        }
    });

    // Если видимых видео нет, то вернуть null.
    if(!visibleVideos.length) return null;

    // Определю координату средней линии.
    const winCenterLine =  Math.round( window.innerHeight / 2 );

    // Какую линию занимает последнее подходящее видео
    let videoCenterLine = getVideoMiddleLine(visibleVideos[0]);

    // Данные подходящего видео
    let suitableVideo = visibleVideos[0];

    // Различие между средней линией страницы и средней линией карточки
    let centerLineDiff = Math.abs( winCenterLine - videoCenterLine );

    // Переберу карточки
    for(let i = 1; i < visibleVideos.length; i++) {
        let card = visibleVideos[i];

        // Какую линию занимает эта карточка
        let thisVideoCenterLine = getVideoMiddleLine(card);

        // Различие между средней линией страницы и средней линией этой карточки
        let thisCenterLineDiff = Math.abs( winCenterLine - thisVideoCenterLine );

        if(thisCenterLineDiff < centerLineDiff) {
            videoCenterLine = thisVideoCenterLine;
            suitableVideo = card;

            centerLineDiff = thisCenterLineDiff
        }
    }

    return suitableVideo
}


function getVideoMiddleLine(video) {
    let videoHeight = Math.abs( video.top - video.bottom );

    return video.top + videoHeight / 2
}


/**
 * Обработчик завершения воспроизведения видео.
 * @param {Number} cardId — id данных карточки где находится видео, которое только что закончило воспроизведение.
 */
function videoEndHandler(cardId) {
    // В массиве videoDataArr найти объект с переданным идентификатором
    // и поставить его свойство readyToAutoPlay в false чтобы оно не начало воспроизводиться снова.
    for(let i = 0; i < videoDataArr.length; i++) {
        if(videoDataArr[i].id === cardId) {
            videoDataArr[i].readyToAutoPlay = false;
            break;
        }
    }

    // Обнулить ссылку на проигрываемое видео.
    playedVideo = null
}


/**
 * Обработчик начала воспроизведения видео
 * @param {Number} cardId — id карточки с видео
 */
function videoStartHandler(cardId) {

    // Если видео было запущено сценарием, то завершить эту функцию.
    if(videoWasRunByScript) return;

    // Остановить воспроизведение текущего видео
    if(playedVideo) playedVideo.pause();

    // Найти видео, которое запустил пользователь
    let thisVideo = videoDataArr.find(obj => {
        return obj.id === cardId
    });


    // Поместить в переменную ссылку на проигрываемое видео
    playedVideo = thisVideo.video;

    // Запретить автоматический запуск видео пока запущенное видео не скроется из вида.
    videoAllowedToRunAutomatically = false;
}



export {
    clearVideoDataArr,
    setDataObjToVideoDataArr,
    updateVideoObj,
    videoPlaybackControl,
    videoEndHandler,
    videoStartHandler
}