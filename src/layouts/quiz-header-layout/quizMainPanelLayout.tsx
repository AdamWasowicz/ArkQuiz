import styles from './quizMainPanelLayout.module.scss';

interface IQuizMainPanelLayout {
    id?: string,
    className?: string,
    children: JSX.Element | JSX.Element[]
}

const QuizMainPanelLayout: React.FC<IQuizMainPanelLayout> = (props) => {
    return (
        <div
            id={props.id}
            className={`${styles.root}  ${props.className}`}
        >
            { props.children}
        </div>
    )
}

export default QuizMainPanelLayout;