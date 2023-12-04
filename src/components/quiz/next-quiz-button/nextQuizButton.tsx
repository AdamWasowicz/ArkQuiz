import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './nextQuizButton.module.scss';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


interface INextQuizButton {
    onClick: () => void,
    id?: string,
    className?: string
}

const NextQuizButton: React.FC<INextQuizButton> = (props) => {

    return (
        <div 
            className={styles.root + " " + props.className} 
            onClick={props.onClick}
            id={props.id}
        >
            <h2 className={styles.text}>Next quiz</h2>

            <FontAwesomeIcon icon={faArrowRight} className={styles.icon}/>
        </div>
    )
}

export default NextQuizButton