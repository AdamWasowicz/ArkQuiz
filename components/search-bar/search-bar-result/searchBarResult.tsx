import { urlToIcon } from "@/lib/apiAccess"
import { OperatorHeader } from "../../../resources/operator/lib/types"
import Image from "next/image";
import styles from './searchBarResult.module.scss';

interface ISearchBarResultProps {
    operatorHeader: OperatorHeader
    onClick: (id: string) => void
}

const SearchBarResult: React.FC<ISearchBarResultProps> = (props) => {
    const { operatorHeader, onClick } = props;

    const onClickHandler = () => {
        onClick(operatorHeader.Name)
    }
    
    return (
        <div className={styles.searchBarResultItem} onClick={onClickHandler}>
            <Image
                className={styles.image}
                src={urlToIcon(window.location.href, operatorHeader.Id)}
                alt={operatorHeader.Name}
                width={75}
                height={75}
            />
            
            <p className={styles.p}>{operatorHeader.Name}</p>
        </div>
    )
}

export default SearchBarResult