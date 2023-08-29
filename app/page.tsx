import CharacterGuessPage from "@/components/character-guess/characterGuessPage";
import { getOperatorHeaderMap } from "@/resources/character/lib/utils";

const Home: React.FC= () => {
  const headers = getOperatorHeaderMap();
  
  return (
    <main>
      <CharacterGuessPage characterHeaderMap={headers}/>
    </main>
  )
}
export default Home;