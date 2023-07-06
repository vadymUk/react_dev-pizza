import React, { useRef } from "react";
import debounce from "lodash.debounce";
import { SearchContext } from "../../App";
import styles from "./Search.module.scss";

const Search = () => {
    const [value, setValue] = React.useState("");
    const { setSearchValue } = React.useContext(SearchContext);
    const inputRef = useRef();

    const onClickClear = () => {
        setSearchValue("");
        setValue("");
        inputRef.current.focus();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 500),
        []
    );

    const onChangeInput = (e) => {
        setValue(e.target.value);
        updateSearchValue(value);
    };

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                height='48'
                viewBox='0 0 48 48'
                width='48'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path d='M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z' />
                <path
                    d='M0 0h48v48h-48z'
                    fill='none'
                />
            </svg>
            <input
                ref={inputRef}
                className={styles.input}
                placeholder='Поиск пиццы...'
                onChange={onChangeInput}
                value={value}
            ></input>
            {value && (
                <svg
                    className={styles.clearIcon}
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={onClickClear}
                >
                    <path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z' />
                </svg>
            )}
        </div>
    );
};

export default Search;
