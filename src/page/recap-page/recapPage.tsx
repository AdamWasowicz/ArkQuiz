"use client"
import PageLayout from "@/src/layouts/page-layout/pageLayout"
import useRecapLocalStorage from "./recapPage.utils"
import RecapSlot from "@/src/modules/recap/components/quiz-recap/recapSlot";
import Paragraph from "@/src/components/ui/paragraph/paragraph";
import styles from './recapPage.module.scss';
import Header from "@/src/components/ui/header/header";

const RecapPage: React.FC = () => {
    const ls = useRecapLocalStorage();
    const operatorData = ls.getOperator();
    const skillData = ls.getSkill();
    const talentData = ls.getTalent();

    return (
        <PageLayout>
            <div className={styles.root}>
                <div className={styles.textContainer}>
                    <Header>Quizes Recaps</Header>
                    <Paragraph>Here you can see your scores over 14 days</Paragraph>
                </div>

                <RecapSlot title="Operator" data={operatorData}/>
                <RecapSlot title="Skill" data={skillData}/>
                <RecapSlot title="Talent" data={talentData}/>
            </div>
        </PageLayout>
    )
}

export default RecapPage;