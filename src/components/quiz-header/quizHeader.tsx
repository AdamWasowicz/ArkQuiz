import styles from './quizHeader.module.scss';

interface IQuizHeader {
    className?: string
    headerContent: string,
    children: JSX.Element | JSX.Element[]
}

const QuizHeader: React.FC<IQuizHeader> = (props) => {

    return (
        <div className={`${styles.mainPanel} ${props.className}`}>
            <h2 className={styles.header}>{props.headerContent}</h2>

            { props.children }
        </div>
  )
}

export default QuizHeader;