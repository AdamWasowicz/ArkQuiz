import Image from "next/image";
import { getCharacterIconRoute, getCharacterSplashRoute, getTodayCharacterId, getAllCharactersHeaderMap } from "@/resources/character/lib/utils";
import SearchBar from "@/resources/character/components/searchBar/searchBar";

const Home: React.FC= () => {
  const todayId = getTodayCharacterId();
  const r1 = getCharacterSplashRoute(todayId);
  const r2 = getCharacterIconRoute(todayId);
  const headers = getAllCharactersHeaderMap();


  return (
    <main>
      
    
      <SearchBar characterHeaders={headers}/>
    </main>
  )
}
export default Home;