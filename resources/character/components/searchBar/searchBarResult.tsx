import { urlToIcon } from "@/lib/api-access"
import { CharacterHeader } from "../../lib/types"
import Image from "next/image";
import styles from './searchBarResult.module.scss';

interface ISearchBarResultProps {
    characterHeader: CharacterHeader
    onClick: (id: string) => void
}

const SearchBarResult: React.FC<ISearchBarResultProps> = (props) => {
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

export default SearchBarResult