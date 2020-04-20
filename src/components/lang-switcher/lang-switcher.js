import React, {useRef, useEffect} from 'react';
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {switchLang} from '../../store/actions';
import {moveHighlight} from './functions';
import s from './LangSwitcher.module.scss'


/**
 * Компонент переключателя языка интерфейса.
 * @return {Object} — JSX компонента.
 * @constructor
 */
function LangSwitcher() {

    // Получу текущий язык интерфейса из Хранилища
    const lang = useSelector(store => store.lang, shallowEqual); // eng или rus

    const dispatch = useDispatch();

    // Ref указывающий на подсветку кнопки и кнопки переключающие языки.
    const highlightRef = useRef(null);
    const rusBtnRef = useRef(null);
    const engBtnRef = useRef(null);


    // При изменении языка запускать moveHighlight() чтобы передвинуть элемент подсветки на текущий язык.
    useEffect(() => {
        moveHighlight(highlightRef, engBtnRef, rusBtnRef, lang)
    }, [lang]);

    
    // Обработчик щелчка по кнопке переключения языка
    const onButtonClick = (lang) => {
        // Поменять в Хранилище язык интерфейса.
        dispatch(switchLang());
    };


    // Создать разметку кнопок
    const buttons = createButtons(rusBtnRef, engBtnRef, onButtonClick, lang);


    return (
        <section className={s.section}>
            <div className={s.btnsWrapper}>
                <div className={s.highlight} ref={highlightRef} />
                {buttons}
            </div>
        </section>
    )
}


/**
 * Функция создающая JSX кнопок переключения языков
 * @param {Object} rusBtnRef — ref указывающий на кнопку переключающая язык на русский.
 * @param {Object} engBtnRef — ref указывающий на кнопку переключающая язык на английский.
 * @param {Function} onButtonClick — обработчик щелчка по кнопке.
 * @param {String} lang — язык интерфейса.
 * @return {Object} — JSX.
 */
function createButtons(rusBtnRef, engBtnRef, onButtonClick, lang) {

    // Массив с конфигурацией кнопок
    let buttonsConfig = [
        {
            text: 'Eng',  // Текст кнопки
            title: 'Switch to English',
            id: 'eng',     // Значение языка использующееся в Хранилище
            ref: rusBtnRef // Ссылка на ref кнопки
        },
        {
            text: 'Рус',
            title: 'Переключиться на русский',
            id: 'rus',
            ref: engBtnRef
        }
    ];

    // Создать JSX кнопок
    return buttonsConfig.map((btnData, i) => {

        // Если свойство btnData.id у кнопки равно текущему языку, то такая кнопка должна быть заблокирована.
        let isDisabled = btnData.id === lang;

        return (
            <button
                className={s.btn}
                title={btnData.title}
                ref={btnData.ref}
                disabled={isDisabled}
                onClick={() => onButtonClick(btnData.id)}
                key={i}
            >
                {btnData.text}
            </button>
        )
    })
}

export default LangSwitcher;