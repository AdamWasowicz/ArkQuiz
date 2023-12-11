import OperatorQuizPage from "@/src/page/operator-page/operatorQuizPage";
import { getOperatorHeaderMap } from "@/src/modules/operator/lib/server-utils";

const OperatorPage: React.FC= () => {
  const headers = getOperatorHeaderMap();
  
  return (<OperatorQuizPage operatorHeaderMap={headers}/>)
}
export default OperatorPage;