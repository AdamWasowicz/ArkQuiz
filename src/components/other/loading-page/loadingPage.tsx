import QuizMainBody from '../../../layouts/page-layout/pageLayout';
import styles from './loadingPage.module.scss';

const LoadingPage: React.FC = () => {
    return (
        <QuizMainBody>
            <h1 className={styles.loading}>Loading...</h1>
        </QuizMainBody>
    )
}

export default LoadingPage;