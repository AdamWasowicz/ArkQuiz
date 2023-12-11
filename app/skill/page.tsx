import SkillQuizPage from "@/src/page/skill-page/skillQuizPage";
import { getOperatorHeaderMap } from "@/src/modules/operator/lib/server-utils";

const SkillPage: React.FC = () => {
    const headers = getOperatorHeaderMap();

    return (<SkillQuizPage operatorHeaderMap={headers}/>)
}

export default SkillPage