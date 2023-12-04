import { ReactNode } from 'react';
import styles from './quizMainBody.module.scss';

interface IQuizMainBody {
    children: JSX.Element | JSX.Element[] | ReactNode,
    className?: string
}

const QuizMainBody: React.FC<IQuizMainBody> = (props) => {
    return (
        <div className={styles.root + " " + props.className}>
            { props.children }
        </div>
    )
}

export default QuizMainBody;