import { getOperatorHeaderMap } from "@/src/modules/operator/lib/server-utils";
import TalentQuizPage from "@/src/page/talent-page/talentQuizPage";


const TalentPage: React.FC = () => {
    const headers = getOperatorHeaderMap();

    return(<TalentQuizPage operatorHeaderMap={headers}/>)
}

export default TalentPage;