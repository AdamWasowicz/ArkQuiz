import OperatorGuessPage from "@/components/operator-guess/operatorGuessPage";
import { getOperatorHeaderMap } from "@/resources/operator/lib/utils";

const Home: React.FC= () => {
  const headers = getOperatorHeaderMap();
  
  return (
    <main>
      <OperatorGuessPage operatorHeaderMap={headers}/>
    </main>
  )
}
export default Home;