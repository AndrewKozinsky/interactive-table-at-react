import React from 'react';
import s from './Spinner.module.scss';
import './twister.scss'


/**
 * Компонент крутилки с сообщением.
 * @param {String} message — сообщение, которое должно быть показано ниже крутилки
 * @return {Object} JSX компонента.
 */
function Spinner({message}) {
    return (
        <div className={s.wrapper}>
            <Twister />
            <p className={s.message}>{message}</p>
        </div>
    )
}

/**
 * Крутилка
 * @return {Object} JSX компонента.
 */
function Twister() {
    return (
        <div className="loadingio-spinner-spinner-eaeb7elgu8">
            <div className="ldio-zr8az2qsok">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}

export default Spinner;