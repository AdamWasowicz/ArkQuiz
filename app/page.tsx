import CharacterGuessPage from "@/components/character-guess/characterGuessPage";
import { getAllCharactersHeaderMap } from "@/resources/character/lib/utils";

const Home: React.FC= () => {
  const headers = getAllCharactersHeaderMap();
  
  return (
    <main>
      <CharacterGuessPage headers={headers}/>
    </main>
  )
}
export default Home;