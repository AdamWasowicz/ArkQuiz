// EXPERIMENTAL
"use client"
import { OperatorHeader, OperatorHeaderMap } from "@/src/modules/operator/lib/types"
import styles from './searchBar.module.scss';
import { ChangeEvent } from "react";
import SearchBarResult from "@/src/components/search-bar/search-bar-result/searchBarResult";

interface ISearchBar {
    operatorHeadersMap: OperatorHeaderMap,
    isFormDisabled: boolean,
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    inputTextValue: string
    onFormSubmit: (event: React.MouseEvent<HTMLElement>) => void,
    currentGuessedOperatorNames: string[],
    onResultClick: (value: string) => void
}

const SearchBar: React.FC<ISearchBar> = (props) => {
    const { 
        operatorHeadersMap, isFormDisabled, 
        onInputChange, inputTextValue, 
        onFormSubmit, currentGuessedOperatorNames,
        onResultClick 
    } = props;

    const filterOperatorHeaders = (chm: OperatorHeaderMap): OperatorHeader[] => {
        if (inputTextValue.length > 0) {

            const values = chm.get(inputTextValue[0].toUpperCase())
            let filteredValues = values?.filter(item => {
                return item.Name.toUpperCase().startsWith(inputTextValue.toUpperCase());
            })

            if (typeof filteredValues === 'undefined') {
                filteredValues = [];
            }

            const guessedOperatorNames = currentGuessedOperatorNames
            filteredValues = filteredValues.filter((item) => {
                return guessedOperatorNames.includes(item.Name)
                    ? false
                    : true;
            })

            return filteredValues!;
        }
        else {
            return []
        }
    }


    const filteredOperatorHeaders = filterOperatorHeaders(operatorHeadersMap);

    return (
        <div className={styles.searchBar}>
            <div className={styles.main}>
                <div className={styles.topPart}>
                    <input 
                        type='text'
                        disabled={isFormDisabled}
                        className={styles.input}
                        onChange={onInputChange}
                        value={inputTextValue}
                    />

                    <button 
                        className={styles.button}
                        onClick={onFormSubmit}
                        disabled={isFormDisabled}
                    >
                        Guess
                    </button>
                </div>
                {
                    filteredOperatorHeaders.length > 0 &&
                    <div className={styles.searchResult}>
                        <div className={styles.abs}>
                        {
                            filteredOperatorHeaders.length > 0 &&
                            filteredOperatorHeaders.map((item, key) => {
                                return <SearchBarResult 
                                    key={key} 
                                    operatorHeader={item}
                                    onClick={onResultClick}
                                />
                            })
                        }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchBar;