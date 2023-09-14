import OperatorGuessPage from "@/src/pages/operator-page/operatorGuessPage";
import { getOperatorHeaderMap } from "@/src/resources/operator/lib/utils";

const OperatorPage: React.FC= () => {
  const headers = getOperatorHeaderMap();
  
  return (<OperatorGuessPage operatorHeaderMap={headers}/>)
}
export default OperatorPage;