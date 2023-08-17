import { CharacterHeader } from "../lib/types";
import SearchBarResultItem from "./searchBarResultItem";
import styles from './searchBarResult.module.scss';
import { useAppDispatch } from "@/redux/hooks";
import { setSearchBarValue } from "@/redux/features/app-slice";

interface ISearchBarResultProps {
    charactersHeaders: CharacterHeader[]
}

const SearchBarResult: React.FC<ISearchBarResultProps> = (props) => {
    const { charactersHeaders: characterHeaders } = props;
    const dispatch = useAppDispatch();

    const onClickHandler = (value: string) => {
        dispatch(setSearchBarValue(value))
    }

    return (
        <div className={styles.searchBarResult}>
            {
                characterHeaders.map((item, key) => {
                    return <SearchBarResultItem 
                        key={key} 
                        characterHeader={item}
                        onClick={onClickHandler}
                    />
                })
            }
        </div>
    )
}

export default SearchBarResult;