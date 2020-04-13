import React from 'react';
import styles from './SearchInput.module.scss'


function SearchInput({value, onChange}) {
    return (
        <input
            type="search"
            className={styles.input}
            placeholder="Поиск имени..."
            value={value}
            onChange={onChange}
        />
    )
}

export default SearchInput;