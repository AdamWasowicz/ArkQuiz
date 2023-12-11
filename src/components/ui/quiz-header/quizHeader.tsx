import styles from './quizHeader.module.scss';

interface IQuizHeader {
    id?: string,
    className?: string,
    children: JSX.Element | JSX.Element[] | string
}

const QuizHeader: React.FC<IQuizHeader> = (props) => {
    return (
        <h2 
            id={props.id}
            className={`${styles.root} ${props.className}`}
        >
                { props.children }
        </h2>
    )
}

export default QuizHeader;