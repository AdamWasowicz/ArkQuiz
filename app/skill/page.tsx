import SkillQuizPage from "@/src/page/skill-page/skillQuizPage";
import { getOperatorHeaderMap } from "@/src/resources/operator/lib/utils";

const SkillPage: React.FC = () => {
    const headers = getOperatorHeaderMap();

    return (<SkillQuizPage operatorHeaderMap={headers}/>)
}

export default SkillPage