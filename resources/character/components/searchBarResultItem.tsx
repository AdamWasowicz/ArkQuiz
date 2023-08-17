import { urlToIcon } from "@/lib/data-fetching"
import { CharacterHeader } from "../lib/types"
import Image from "next/image";
import styles from './searchBarResultItem.module.scss';

interface ISearchBarResultItemProps {
    characterHeader: CharacterHeader
    onClick: (id: string) => void
}

const SearchBarResultItem: React.FC<ISearchBarResultItemProps> = (props) => {
    const { characterHeader, onClick } = props;

    const onClickHandler = () => {
        onClick(characterHeader.Name)
    }
    
    return (
        <div className={styles.searchBarResultItem} onClick={onClickHandler}>
            <Image
                src={urlToIcon(window.location.href, characterHeader.Id)}
                alt={characterHeader.Name}
                width={50}
                height={50}
            />

            <p>{characterHeader.Name}</p>
        </div>
    )
}

export default SearchBarResultItem