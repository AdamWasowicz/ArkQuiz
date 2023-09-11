import OperatorGuessPage from "@/src/components/operator-guess/operatorGuessPage";
import { getOperatorHeaderMap } from "@/src/resources/operator/lib/utils";

const Home: React.FC= () => {
  const headers = getOperatorHeaderMap();
  
  return (
    <main>
      <OperatorGuessPage operatorHeaderMap={headers}/>
    </main>
  )
}
export default Home;