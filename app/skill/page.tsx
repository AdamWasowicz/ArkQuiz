import SkillGuessPage from "@/src/pages/skill-page/skillGuessPage";
import { getOperatorHeaderMap } from "@/src/resources/operator/lib/utils";

const SkillPage: React.FC = () => {
    const headers = getOperatorHeaderMap();

    return (<SkillGuessPage operatorHeaderMap={headers}/>)
}

export default SkillPage