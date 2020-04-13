import React from 'react';
import ControlsWrapper from "../people-table-controls/controls-wrapper";
import PeopleList from "../people-list/people-list";
import styles from './People.module.scss'


function People() {
    
    return (
        <section className={styles.wrapper}>
            <ControlsWrapper />
            <PeopleList />
        </section>
    )
}

export default People;