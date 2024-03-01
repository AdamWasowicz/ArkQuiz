"use client"
import PageLayout from '@/src/layouts/page-layout/pageLayout';
import styles from './homePage.module.scss';
import Header from '@/src/components/ui/header/header';
import Paragraph from '@/src/components/ui/paragraph/paragraph';
import SubHeader from '@/src/components/ui/sub-header/subHeader';
import Button from '@/src/components/ui/button/button';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
    const router = useRouter();

    const navigateToFirstQuiz = () => {
        router.push('./operator');
    }

    return (
        <PageLayout>
            <div className={styles.root}>
                <div className={styles.section}>
                    <Header className={styles.shrinkWhenTight}>What is Arkquiz?</Header>

                    <Paragraph>
                        It&apos;s an app for Arknights trivia quizes, made for fun by one developer. 
                        It&apos;s a hobby project. I came with an idea when I saw app similar in nature called loldle, it was quiz app, but with League of Legends characters. 
                        I wanted to test my Next.js skills and make cool project for my portfolio.
                    </Paragraph>
                </div>

                <div className={styles.section}>
                    <Header className={styles.shrinkWhenTight}>Quizes</Header>

                    <Paragraph>
                        There are several types of quizes, you can see them at the top of app. 
                        At the end of each quiz you will be present a button that will take you to the next quiz. 
                        Each quiz has one goal, guesses the correct answer with as little as possible tries. 
                    </Paragraph>

                    <div className={styles.subsection}>
                        <SubHeader>Types</SubHeader>

                        <ul className={styles.list}>
                            <li>
                                <span>Operator</span>
                                Try to guess operator by traits like Gender, Race, Class, Branch and etc. 
                                You will be given indicators what traits are correct, partial or wrong. Use them to guess the operator with as little guesses as posible. 
                                After some wrong guesses you will be able to see hint.
                            </li>

                            <li>
                                <span>Skill</span>
                                Try to guess whos skill is displayed. You will see ability icon. 
                                After some wrong guesses you will be able to see hint. After guessing you will be shown if you were right or wrong.
                            </li>

                            <li>
                                <span>Talent</span>
                                Try to guess what operators has displayed talent, you will be shown talent description. 
                                After some wrong guesses you will be able to see hint. After guesssing you will be shown if you were right or wrong.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.section}>
                    <Header className={styles.shrinkWhenTight}>Recap</Header>

                    <Paragraph>
                        Arkquiz keeps track of your scores over two weeks, you can see them in form of graph in recap section of app. 
                        You can go to the recap via navigation at the top of app or finish last quiz and press button to see recap.
                    </Paragraph>
                </div>

                <Button onClick={navigateToFirstQuiz} className='center'>
                    Go to first quiz
                </Button>
            </div>
        </PageLayout>
    )
}

export default HomePage;