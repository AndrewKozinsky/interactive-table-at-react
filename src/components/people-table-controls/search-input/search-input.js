import React from 'react';
import styles from './SearchInput.module.scss'


function SearchInput({value = '', onChange = () => {}, placeholder = ''}) {
    return (
        <input
            type="search"
            className={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default SearchInput;