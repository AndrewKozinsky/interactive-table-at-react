import React from 'react';
import {Provider} from 'react-redux';
import store from '../../store/store'
import FixedHeader from '../fixed-header';
import LangSwitcher from '../lang-switcher';
import People from '../people';

import './css/reset.css';
import './css/variables.scss';
import './css/general.scss';
import style from './css/App.module.scss';


function App() {

    return (
        <Provider store={store}>
            <FixedHeader />
            <div className={style['page-wrapper']}>
                <LangSwitcher />
                <People />
            </div>


        </Provider>
    );
}

export default App;