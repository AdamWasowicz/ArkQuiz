"use client"
import { OperatorHeader, OperatorHeaderMap } from "@/src/modules/operator/lib/types"
import styles from './searchBar.module.scss';
import { ChangeEvent } from "react";
import Image from 'next/image';
import { routeToOperatorIcon } from "@/src/lib/serverFunctions"

interface IQuizSearchBar {
    operatorHeadersMap: OperatorHeaderMap,
    isFormDisabled: boolean,
    inputTextValue: string
    excludedOperatorNames: string[],

    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    onFormSubmit: (event: React.MouseEvent<HTMLElement>) => void,
    onResultClick: (value: string) => void
}

const QuizSearchBar: React.FC<IQuizSearchBar> = (props) => {
    const { 
        operatorHeadersMap, isFormDisabled, 
        onInputChange, inputTextValue, 
        onFormSubmit, excludedOperatorNames: currentGuessedOperatorNames,
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
                                return <SearchResultRow 
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

export default QuizSearchBar;


// Result
interface ISearchResultRow {
    operatorHeader: OperatorHeader
    onClick: (id: string) => void
}

const SearchResultRow: React.FC<ISearchResultRow> = (props) => {
    const { operatorHeader, onClick } = props;

    const onClickHandler = () => {
        onClick(operatorHeader.Name)
    }
    
    return (
        <div className={styles.searchBarResultItem} onClick={onClickHandler}>
            <Image
                className={styles.image}
                src={routeToOperatorIcon(operatorHeader.Id)}
                alt={operatorHeader.Name}
                width={75}
                height={75}
            />
            
            <p className={styles.p}>{operatorHeader.Name}</p>
        </div>
    )
}