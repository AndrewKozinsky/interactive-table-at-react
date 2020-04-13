import React from 'react';
import styles from './ControlsWrapper.module.scss'
import Sorting from "../sorting";
import View from "../view";
import Order from "../order";
import Search from "../search";


function ControlsWrapper() {

    return (
        <div className={styles['wrapper']}>
            <div className={styles['block-1']}>
                <Sorting />
            </div>

            <div className={styles['block-2']}>
                <View />
                <Order />
            </div>

            <div className={styles['block-3']}>
                <Search />
            </div>
        </div>
    )
}


export default ControlsWrapper;