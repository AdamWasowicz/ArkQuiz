import { urlToIcon } from "@/lib/api-access"
import { OperatorHeader } from "../../lib/types"
import Image from "next/image";
import styles from './searchBarResult.module.scss';

interface ISearchBarResultProps {
    characterHeader: OperatorHeader
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
                className={styles.image}
                src={urlToIcon(window.location.href, characterHeader.Id)}
                alt={characterHeader.Name}
                width={75}
                height={75}
            />
            
            <p className={styles.p}>{characterHeader.Name}</p>
        </div>
    )
}

export default SearchBarResult